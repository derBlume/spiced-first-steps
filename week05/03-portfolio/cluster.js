const cluster = require("cluster");
const os = require("os");

const numCpus = os.cpus().length;

cluster.setupMaster({
    exec: __dirname + "/index.js", // master process
});

for (let i = 0; i < numCpus; i++) {
    cluster.fork(); // child process / workers
}

// if a worker dies - we replace them
cluster.on("exit", (worker) => {
    console.log("worker: ", worker.process.pid);
    cluster.fork();
});
