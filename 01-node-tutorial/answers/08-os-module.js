import os, { freemem } from "os";

const osObj = {
  cpuArch: os.arch(),
  freemem: os.freemem(),
  hostName: os.hostname(),
  typeOperationSys: os.type(),
};

console.log(osObj);
