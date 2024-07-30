import initSqlJs from "sql.js"

// Initialize sql.js and perform tests
describe("sql.js Tests", () => {
  it("should create and query a database", async () => {
    // Initialize sql.js
    const SQL = await initSqlJs()

    // Create a new database
    const db = new SQL.Database()

    // Create a table
    db.run("CREATE TABLE test (id INTEGER PRIMARY KEY, name TEXT)")

    // Insert a row
    db.run("INSERT INTO test (name) VALUES (?)", ["John Doe"])

    // Query the database
    const result = db.exec("SELECT * FROM test")

    // Check the result
    expect(result.length).toBe(1)
    expect(result[0].values).toEqual([[1, "John Doe"]])
  })
})
