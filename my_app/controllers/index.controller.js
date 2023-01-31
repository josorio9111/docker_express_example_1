exports.index = (req, res) => {
  const apiExamples = {
    mensaje: "Bienvenidos a my_app",
    APIS: {
      base_url: "api/examples",
      data: {
        create: {
          url: "/",
          method: "POST",
          description: "Create example",
          example: `curl --location --request POST 'http://localhost:8080/api/examples' --header 'Content-Type: application/x-www-form-urlencoded' --data-urlencode 'title=examples 1' --data-urlencode 'description=description 1' --data-urlencode 'published=true'`,
        },
        findAll: {
          url: "/",
          method: "GET",
          description: "Find All examples",
          example: `curl --location --request GET 'http://localhost:8080/api/examples'`,
        },
        findAllPublished: {
          url: "/published",
          method: "GET",
          description: "Find All Published examples",
          example: `curl --location --request GET 'http://localhost:8080/api/examples/published'`,
        },
        findOne: {
          url: "/:id",
          method: "GET",
          description: "Find One by ID",
          example: `curl --location --request GET 'http://localhost:8080/api/examples/:id'`,
        },
        update: {
          url: "/:id",
          method: "PUT",
          description: "Update a Example with id",
          example: `curl --location --request PUT 'http://localhost:8080/api/examples/63d858f35e59343a421350c6' --header 'Content-Type: application/x-www-form-urlencoded' --data-urlencode 'title=title update' --data-urlencode 'description=description update' --data-urlencode 'published=false'`,
        },
        delete: {
          url: "/:id",
          method: "DETELE",
          description: "Delete a Example with id",
          example: `curl --location --request DETELE 'http://localhost:8080/api/examples/:id'`,
        },
        deleteAll: {
          url: '/"',
          method: "DELETE",
          description: "Delete all Examples",
          example: `curl --location --request DELETE 'http://localhost:8080/api/examples' `,
        },
      },
    },
  };
  res.status(200).json(apiExamples);
};
