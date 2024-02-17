module.exports = {
    // Configuration options accepted by the `relay-compiler` command-line tool and `babel-plugin-relay`
    src: "./src",
    language: "typescript",
    schema: "./data/schema.graphql",
    artifactDirectory: "./__generated__",
    excludes: ["**/node_modules/**", "**/__mocks__/**", "**/__generated__/**"],
}