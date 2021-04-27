import React from "react";
import ReactDOM from "react-dom";

import "./styles.css";

/*
  Instructions:
    You're given an array of `postIds` and a `fetchPost` function.
    When you invoke `fetchPost`, you'll need to pass it an `id` from
    the `postIds` array. `fetchPost` returns a promise that will resolve
    with a post shaped like this

    {
      "userId": 1,
      "id": 1,
      "title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
      "body": "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto"
    }

    The UI should show `Loading` if the request is still being made,
    an error message if there was an error, or the post title, body,
    and a button to fetch the next post on a successful request.
*/

const postIds = [1, 2, 3, 4, 5, 6, 7, 8];

function fetchPost(id) {
  return fetch(`https://jsonplaceholder.typicode.com/posts/${id}`).then((res) =>
    res.json()
  );
}

function App() {
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);
  const [postIdIndex, setPostIdIndex] = React.useState(0);
  const [postBody, setPostBody] = React.useState(null);

  React.useEffect(() => {
    fetchPost(postIdIndex).then((response) => {
      setPostBody(response);
      setLoading(false);
      setError(null);
    });
  }, [postIdIndex]);

  const handleFetchPost = () => {
    if (error) {
      setError(null);
    }

    setLoading(true);
    setPostIdIndex((i) => (i === postIds.length - 1 ? i : i + 1));
  };

  if (error) {
    return (
      <>
        <p>There was an error</p>
        <p>{error}</p>
        <button onClick={handleFetchPost}>Next Post</button>
      </>
    );
  }

  return (
    <div className="App">
      {postIdIndex === 0 ? (
        <div>Click button to fetch post</div>
      ) : loading ? (
        "Loading..."
      ) : (
        <pre>{JSON.stringify(postBody, null, 2)}</pre>
      )}

      {postIdIndex === 0 ? (
        <button onClick={handleFetchPost}> Fetch Post</button>
      ) : (
        <button onClick={handleFetchPost}>Next Post</button>
      )}
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
