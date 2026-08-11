// server.js
// Entry point for cPanel / Phusion Passenger Node.js Application
const path = require('path');

// Ensure we are running in production mode
process.env.NODE_ENV = 'production';

// Passenger automatically injects the PORT environment variable.
// The Next.js standalone server will pick it up and listen on it.
try {
  require(path.join(__dirname, '.next', 'standalone', 'server.js'));
  console.log("Next.js standalone server started successfully.");
} catch (err) {
  console.error("Failed to start Next.js standalone server. Make sure you have run 'npm run build' first.", err);
  process.exit(1);
}
