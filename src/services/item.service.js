const { item } = require("../models");

class ItemService {
  constructor() {
    this.model = item;
  }

  #changeTheFirstLetterToUpperCase(word) {
    return word[0].toUpperCase() + word.substring(1);
  }

  async create(body) {
    const result = await this.model.create(body);
    return result;
  }

  async getOne(name) {
    const result = await this.model.findOne(
      { name: this.#changeTheFirstLetterToUpperCase(name) },
      { _id: 0, __v: 0 }
    );
    return result;
  }

  async update(name, body) {
    const result = await this.model.updateOne(
      { name: this.#changeTheFirstLetterToUpperCase(name) },
      body
    );
    return result;
  }

  async delete(name) {
    const result = await this.model.deleteOne({
      name: this.#changeTheFirstLetterToUpperCase(name),
    });
    return result;
  }

  async getList(filter) {
    const result = await this.model.find(
      !filter.category
        ? {}
        : {
            category: this.#changeTheFirstLetterToUpperCase(filter.category),
          },
      { _id: 0, __v: 0 }
    );

    return result;
  }

  async getAmount() {
    const categories = await this.model.distinct("category");

    const entries = new Map(
      (
        await Promise.all(
          categories.map(async (category) => {
            return await this.model.findOne({ category: category }).count();
          })
        )
      ).map((number, i) => [categories[i], number])
    );

    return Object.fromEntries(entries);
  }
}

module.exports = ItemService;
