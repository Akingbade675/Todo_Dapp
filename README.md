# Todo Smart Contract

The Todo smart contract is a decentralized application (DApp) deployed on the NEAR Protocol blockchain that allows users to manage their todo lists. Users can add new todo items, mark items as complete, remove individual items, remove all completed items, and clear their entire todo list using this smart contract.

## Features

-   **Add Todo**: Users can add new todo items to their lists.
-   **Mark as Complete**: Users can mark todo items as complete.
-   **Remove Todo**: Users can remove individual todo items from their lists.
-   **Remove Completed Todos**: Users can remove all completed todo items from their lists.
-   **Remove All Todos**: Users can remove all todo items from their lists.

## Usage

### Prerequisites

-   Ensure you have a NEAR Protocol wallet set up.
-   Make sure you are connected to the NEAR testnet or mainnet.

### Installation

No installation is required to use the Todo smart contract. Simply interact with it using a NEAR Protocol wallet and a supported DApp frontend.

### Interacting with the Smart Contract

You can interact with the Todo smart contract using a NEAR Protocol wallet and a frontend interface that integrates with the contract's methods.

You can interact with the contract by visiting the following link:

[Testnet Smart Contract](https://testnet.nearblocks.io/address/bhobo1.testnet)

## Methods

### `get_todos`

Get all todo items for the caller.

#### Example Input:

```json
{}
```

#### Example Output:

```json
[
    {
        "description": "Buy groceries",
        "completed": false
    },
    {
        "description": "Finish homework",
        "completed": true
    }
]
```

### `add_todo`

Add a new todo item to the list.

#### Example Input:

```json
{
    "description": "Buy groceries"
}
```

### `complete_todo`

Mark a todo item as complete.

#### Example Input:

```json
{
    "index": 0
}
```

### `remove_todo`

Remove a todo item from the list.

#### Example Input:

```json
{
    "index": 0
}
```

### `remove_completed_todos`

Remove all completed todo items from the list.

#### Example Input:

```json
{}
```

### `remove_all_todos`

Remove all todo items from the list.

#### Example Input:

```json
{}
```

## Development

If you want to contribute to the development of the Todo smart contract, follow these steps:

1. Clone the repository.
2. Install dependencies using `npm install`.
3. Make changes to the contract code as needed.
4. Test your changes using the provided unit tests.
5. Submit a pull request with your changes.
