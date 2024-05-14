
use near_sdk::store::LookupMap;
use near_sdk::{env, log, near, AccountId, Timestamp, near_bindgen};

// Define the Todo struct to represent each task
#[near(serializers = [borsh, json])]
#[derive(Clone)]
pub struct Todo {
    description: String,
    completed: bool,
}

impl Todo {
    pub fn new (description: String) -> Self {
        Todo { description: description, completed: false }
    }
}

#[near(contract_state)]
pub struct TodoList {
    owner: AccountId,
    users_todos: LookupMap<AccountId, Vec<Todo>>,
}

impl Default for TodoList {
    fn default() -> Self {
        Self { owner: env::current_account_id(), users_todos: LookupMap::new(b"t".to_vec()) }
    }
}

#[near]
impl TodoList {
    // Initialize method for creating a new instance of the TodoList
    #[init]
    pub fn new(owner: AccountId) -> Self {
        Self {
            users_todos: LookupMap::new(b"t".to_vec()), // Initialize todos_by_user map
            owner, // Set the owner as the provided account ID
        }
    }

    // Method to add a new TODO item for the caller
    pub fn add_todo(&mut self, description: String) {
        let user_id = env::predecessor_account_id();
        let new_vec = Vec::new();
        let todos = self.users_todos.get(&user_id).unwrap_or_else(|| &new_vec).clone();
        let mut todos_clone = todos.clone();

        // Create a new TODO item
        let todo = Todo::new(description.clone());
        todos_clone.push(todo);
        self.users_todos.insert(user_id, todos_clone);

        // Log the event
        log!("Added a new TODO item: {}", description);

        // Emit the event
        // self.events.push(Event::TodoAdded { id, description });
    }

    // Method to mark a TODO item as completed
    pub fn complete_todo(&mut self, index: usize) {
        let user_id = env::predecessor_account_id();
        
        if let Some(todos) = self.users_todos.get_mut(&user_id) {
            if let Some(todo) = todos.get_mut(index) {
                todo.completed = true;
            }
        }
    }

    // Method to get all the TODO items for the caller
    pub fn get_todos(&self, account_id: AccountId) -> Vec<Todo> {
        let new_vec = Vec::new();
        self.users_todos.get(&account_id).unwrap_or_else(|| &new_vec).clone()
    }

    // Method to remove a TODO item from the list of the caller
    pub fn remove_todo(&mut self, index: usize) {
        let user_id = env::predecessor_account_id();
        if let Some(todos) = self.users_todos.get_mut(&user_id) {
            todos.remove(index);
            
        }
    }

    // Method to remove all completed TODO items
    pub fn remove_completed_todos(&mut self) {
        let user_id = env::predecessor_account_id();
        if let Some(todos) = self.users_todos.get_mut(&user_id) {
            todos.retain(|todo| !todo.completed);
        }
    }

    // Method to remove all TODO items
    pub fn remove_all_todos(&mut self) {
        let user_id = env::predecessor_account_id();
        self.users_todos.remove(&user_id);
    }
}

#[cfg(not(target_arch = "wasm32"))]
#[cfg(test)]
mod tests {
    use near_sdk::test_utils::{accounts, VMContextBuilder};
    use near_sdk::testing_env;

    use super::*;


    // Function to set up the testing context and environment
    fn setup_contract() -> TodoList {
        let vmcontext_builder = &mut VMContextBuilder::new();
        let context = vmcontext_builder
            .current_account_id(accounts(0))
            .predecessor_account_id(accounts(1));
            
        testing_env!(context.build());

        TodoList::new(accounts(0))
    }

    #[test]
    fn test_add_todo() {
        let mut contract = setup_contract();
        contract.add_todo("Buy milk".to_string());
        let todos = contract.get_todos(accounts(1));
        assert_eq!(todos.len(), 1);
        assert_eq!(todos[0].description, "Buy milk");
    }

    #[test]
    fn test_complete_todo() {let mut contract = setup_contract();
        contract.add_todo("Buy milk".to_string());
        contract.complete_todo(0);
        let todos = contract.get_todos(accounts(1));
        assert_eq!(todos.len(), 1);
        assert_eq!(todos[0].completed, true);
    }

    #[test]
    fn test_remove_todo() {let mut contract = setup_contract();
        contract.add_todo("Buy milk".to_string());
        contract.remove_todo(0);
        let todos = contract.get_todos(accounts(1));
        assert_eq!(todos.len(), 0);
    }

    #[test]
    fn test_remove_completed_todos() {let mut contract = setup_contract();
        contract.add_todo("Buy milk".to_string());
        contract.complete_todo(0);
        contract.remove_completed_todos();
        let todos = contract.get_todos(accounts(1));
        assert_eq!(todos.len(), 0);
    }

    #[test]
    fn test_remove_all_todos() {let mut contract = setup_contract();
        contract.add_todo("Buy milk".to_string());
        contract.remove_all_todos();
        let todos = contract.get_todos(accounts(1));
        assert_eq!(todos.len(), 0);
    }
}