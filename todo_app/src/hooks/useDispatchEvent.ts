const useDispatchEvent = (type: string): Function => {
  const todoListFetchEvent = () => {
    window.dispatchEvent(new Event(type));
  }

  return todoListFetchEvent;
}

export default useDispatchEvent;