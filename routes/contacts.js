const router = require("express").Router();

const contactsController = require("../controllers/contacts");

router.get("/", contactsController.getAll);
router.get("/:id", contactsController.getOne);
router.post("/", (req, res) => {
  /** #swagger.auto = true
   *
   * #swagger.produces = ['application/json']
   * #swagger.consumes = ['application/json']
   * #swagger.parameters['body'] = {
   *      in: 'body',
   *      description: 'contact data.',
   *      required: true,
   *      schema: {
   *          firstName: 'first name',
   *          lastname: 'last name',
   *          email: 'email address',
   *          favoriteColor: 'favourite color',
   *          birthday: 'birth date as yyy-mm-dd'
   *      }
   * }
   *
   * #swagger.responses[201] = { description: 'contact created successfully' }
   * #swagger.responses[500] = { description: 'Server failure.'}
   */
  return res.send();
});

module.exports = router;
