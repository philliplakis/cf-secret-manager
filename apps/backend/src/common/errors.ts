/**
 * Represents a custom error class for applications, extending the native Error class.
 * This class adds an `statusCode` property to standardize error handling across the application.
 */
export class CustomErrorClass extends Error {
  /**
   * The https error code to return.
   * @type {number}
   */
  statusCode: number;
  /**
   * Constructs an instance of the AllstarCustomErrorClass.
   * @param {string} message - The error message.
   * @param {number} statusCode - The custom error code associated with this error.
   */
  constructor(message: string, statusCode: number) {
    super(message); // Call the parent class constructor with the message.
    this.name = this.constructor.name; // Set the error name to the name of this class.
    this.statusCode = statusCode; // Add a custom property statusCode to store the error code.
  }
}
