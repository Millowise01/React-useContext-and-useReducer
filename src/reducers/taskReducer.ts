// The shape of a single task. Each one needs a unique id (used as the
// React key and to find/remove it later) and its text content.
type Task = { id: number; text: string };

// The whole state managed by this reducer is just an array of tasks.
type State = Task[];

// A discriminated union of every action this reducer understands.
// Each variant has a `type` string literal that TypeScript can use to
// narrow the shape of `action` inside the switch statement below —
// e.g. once `action.type === "add"` is checked, TS knows
// `action.payload` is a string; once it's "remove", TS knows
// `action.payload` is a number. Adding a new action type here forces
// you to handle it in the switch, since anything unhandled falls to
// `default` and throws.
type Action =
  | { type: "add"; payload: string }
  | { type: "remove"; payload: number };

// The reducer: given the current state and an action, return the
// NEW state. It never mutates `state` directly — every branch
// returns a new array (via spread `...state` or `.filter`), which is
// what lets React detect the change and re-render.
export function taskReducer(state: State, action: Action): State {
  switch (action.type) {
    case "add":
      // Append a new task. Date.now() is used here as a quick unique
      // id since two tasks can't be added at exactly the same
      // millisecond in this simple app.
      return [...state, { id: Date.now(), text: action.payload }];

    case "remove":
      // Keep every task EXCEPT the one whose id matches the payload.
      return state.filter((task) => task.id !== action.payload);

    default:
      // Should be unreachable if all Action variants are handled above —
      // this exists as a safety net in case an unexpected action sneaks in.
      throw new Error("Unknown action type");
  }
}