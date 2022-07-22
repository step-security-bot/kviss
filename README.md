# kviss

kviss is an internal quiz application for the employees of NAV, and can be accessed at [https://kviss-web.dev.intern.nav.no/](https://kviss-web.dev.intern.nav.no/)

## Apps

[web](web)\
Frontend app build using [Remix](https://remix.run/)

[backend](backend)\
Backend built using Kotlin and Ktor. Offers REST API and data storage with Postgres.

## Communication flow

```mermaid
sequenceDiagram

actor H as Host
actor P as Player(s)

participant W as WebSocket
participant A as API

H ->> A: Create game
A ->> H: Game PIN
H ->> W: Connect with PIN
W -->> H: Connected

P ->> A: Join game (with PIN/usr)
A ->> P: Game exists (in lobby) (player data) / does not exist (try again)
P -->> W: Connect to game (playerId)
W -->> H: Player connected
Note right of P: Player in lobby

H -->> W: Start game
A ->> H: Get all questions (?)

loop
    A ->> W: GET question
    W -->> H: Send question & alternatives
    W -->> P: Send alternatives

    P -->> W: Select answer
    W ->> A: Validate answer

    rect rgb(80,80,80)
       W -->> P: Wait for host / all players
       H -->> W: Trigger result screen
    end
    W -->> P: Send answer result and score
    W -->> H: Send leaderboard
    H -->> W: Next question / finish game
end
W ->> A: Close game
W -->> P: Final results
W -->> H: Final leaderboard
Note right of W: Close connection
```

## GitHub guidelines

### Issues

For every task a issue should be created and relevant tags should be added to the issue. When creating a issue it should be added to the workboard for the repository under the "Projects" selection menu as to automate the issue. The title of the issue should be short and straigth to the points, while the description can be more in depth. Including a description is recommended and relevant tags should be added.

### Branches

Branches should be created from an issue and should in most cases use the name that GitHub generates. This can be done by choosing an issue to create a branch from, then click "Create a branch" under the "Development" selection menu.

### Commits

Each commit message should start with the on of the following verbs: **Add, Fix, Update, Delete**. The commit message should also be short and descriptive on what code has been affected and how the code has been affected.

### Pull requests

Every pull request should stem from a branch created from an issue. The description of the pull request should contain what code changes is done in comparison with the code in the main branch and a link to the respective issue must be included as to automate the pull request and issue.

## SCRUM guidelines

### Standup

Standup's are done at 09:00 Monday to Thursday and every developer is to stand up from their chair when being performed. The standup should not contain any technical and should cover what has been done, what is going to be done and if their are any roadblocks in what is to be done.

### Sprint retrospective

Sprint retrospectives should be held at 09:00 every friday and should cover what went well, what needs to be improved and what should be done untill the next sprint.
