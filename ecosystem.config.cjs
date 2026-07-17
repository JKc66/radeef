module.exports = {
  apps: [
    {
      name: "radeef",
      script: "bun",
      args: "run preview --port 3003 --host 0.0.0.0",
      cwd: "/home/ubuntu/radeef",
      env: {
        NODE_ENV: "production"
      }
    }
  ]
};
