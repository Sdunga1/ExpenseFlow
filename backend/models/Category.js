const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
      set: (val) => {
        if (typeof val !== "string") return val;
        const lower = val.trim().toLowerCase();
        return lower.charAt(0).toUpperCase() + lower.slice(1);
      },
      default: "Uncategorized",
    },
    type: {
      type: String,
      required: true,
      enum: ["income", "expense"],
    },
  },
  {
    timestamps: true,
    collation: { locale: "en", strength: 2 },
    runSettersOnQuery: true,
  }
);

categorySchema.index({ user: 1, name: 1 }, { unique: true });

module.exports = mongoose.model("Category", categorySchema);
