const { exec } = require("child_process");

export const Ports = {
  setMode: (port, mode = "out") => exec(`gpio mode ${port} ${mode}`),
  open: (port) => exec(`gpio write ${port} 0`),
  close: (port) => exec(`gpio write ${port} 1`),
};
