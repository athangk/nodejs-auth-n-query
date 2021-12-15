const getTodos = async function (req, res, next) {
  const todosResult = {
    result: [
      {
        id: "string1",
        completed: true,
        text: "string text 1",
      },

      {
        id: "string2",
        completed: false,
        text: "string text 2",
      },

      {
        id: "string3",
        completed: true,
        text: "string text 3",
      },
    ],
  }

  try {
    res.status(201).json(todosResult)
  } catch (e) {
    return res.status(400).send("Oops something went wrong!")
  }
}

const getSingleTodo = async function (req, res, next) {
  const todosResult = {
    result: [
      {
        id: "string1",
        completed: true,
        text: "string text 1",
      },
      {
        id: "string2",
        completed: false,
        text: "string text 2",
      },

      {
        id: "string3",
        completed: true,
        text: "string text 3",
      },
    ],
  }

  try {
    res.status(201).json(todosResult)
  } catch (e) {
    return res.status(400).send("Oops something went wrong!")
  }
}

module.exports = { getTodos, getSingleTodo }
