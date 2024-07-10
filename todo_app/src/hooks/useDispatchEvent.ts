const useDispatchEvent = <T>(type: string, detail: T | undefined = undefined): Function => {
  const todoListFetchEvent = () => {
    const customEvent = new CustomEvent(type, { detail: detail });
    window.dispatchEvent(customEvent);
  }

  return todoListFetchEvent;
}

export default useDispatchEvent;