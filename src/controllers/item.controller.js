const autoBind = require("auto-bind");
const { item: ItemService } = require("../services");
const { createSchema, updateSchema, filterSchema } = require("../validation");
const itemService = new ItemService();

class ItemController {
  constructor() {
    this.service = itemService;
    autoBind(this);
  }

  async create(req, res) {
    const validation = createSchema.validate(req.body);
    if (validation.error)
      return res.status(400).send(validation.error.details[0].message);
    if (this.service.getOne(req.body.name))
      return res.status(400).send("The item has been already added!");
    await this.service.create(req.body);
    return res.status(201).send("The item has been successfuly added!");
  }

  async getOne(req, res) {
    const result = await this.service.getOne(req.params.name);
    !result
      ? res.status(404).send("The item is not found!")
      : res.status(200).send(result);
  }

  async update(req, res) {
    const validation = updateSchema.validate(req.body);
    if (validation.error)
      return res.status(400).send(validation.error.details[0].message);

    const result = await this.service.update(req.params.name, req.body);
    !result.matchedCount
      ? res.status(404).send("The item is not found!")
      : res.status(200).send("The item has been successfuly updated!");
  }

  async delete(req, res) {
    const result = await this.service.delete(req.params.name);
    !result.deletedCount
      ? res.status(404).send("The item is not found!")
      : res.status(204);
  }

  async getList(req, res) {
    const result = await this.service.getList(req.query);
    !result
      ? res.status(404).send("Items are not found!")
      : res.status(200).send(result);
  }

  async getAmount(req, res) {
    const result = await this.service.getAmount();
    !result
      ? res.status(404).send("Items are not found!")
      : res.status(200).send(result);
  }
}

module.exports = ItemController;
