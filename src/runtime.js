/**
 * The @composi/runtime.
 * @example
 *
 * ```
 * // Create a runtime program
 * const program = {
 *   // Define state:
 *   init() {
 *     return [{count: 0}]
 *   },
 *   // Define view to render.
 *   // Notice event to send message 'incr'.
 *   view(state, send) {
 *      return render(<div onclick={send('incr')}>The count is: {state.count}</div>, document.body)
 *   },
 *   // Define action to update state:
 *   update(state, msg) {
 *     if (msg === 'incr') {
 *        return [state.count++]
 *     }
 *   }
 * }
 * // Run the program:
 * run(program)
 * ```
 * @typedef {any} State - type any.
 * @typedef {Function} Effect - A function to execute.
 * @typedef {Object<string, any>} Program A program to run.
 * @prop {Function} Program.init
 * @prop {Function} Program.view
 * @prop {Function} Program.update
 * @prop {Function} [Program.subscriptions]
 * @prop {Function} [Program.subs] Shortcut for subscriptions.
 * @prop {Function} [Program.done]
 * @param {Program} program A program to run with four methods: `init`, `view`, `update` and `subscriptions`.
 * @return {() => void} Function to terminate runtime.
 */
export function run(program) {
  const update = program.update
  const view = program.view
  const subscriptions = program.subscriptions || program.subs
  const done = program.done
  let state, effect
  let isRunning = true
  let isFirstRun = true
  const getState = () => state

  /**
   * Send a message.
   * @param {any} message A message of any type.
   * @return {void} undefined
   */
  function send(message) {
    if (isRunning) {
      updateView(update(state, message, send))
    }
  }

  /**
   * Expose send as static function on program object.
   * This is to let you send messages to the program
   * from other contexts, such as in a @composi/router action.
   */
  program['send'] = send

  /**
   * Handle changes to state and executing effects.
   * @param {any[]} update
   * @return {void} undefined
   */
  function updateView(update) {
    let sub
    let init = program.init()
    if (update) {
      ;[state, effect] = update
    } else if (init && init.length) {
      ;[state, effect] = init
      if (subscriptions && isFirstRun) {
        sub = subscriptions(getState, send)
        if (typeof sub === 'function') sub(getState, send)
        isFirstRun = false
      }
    } else {
      state = []
    }
    if (effect) {
      effect(state, send)
    }
    view(state, send)
  }

  updateView(state)

  /**
   * Function to end runtime.
   * @return {void} undefined
   */
  return () => {
    if (isRunning) {
      isRunning = false
      if (done) {
        done(state)
      }
    }
  }
}
