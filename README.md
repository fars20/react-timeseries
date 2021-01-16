# React Timeseries

![ReactTimeseries](docs/screenshot-ReactTimeseries-02-annotated.png)

[![Gitter](https://badges.gitter.im/gitterHQ/gitter.svg)](https://gitter.im/ReactTimeseries)
[![TravisCI](https://img.shields.io/travis/far20/ReactTimeseries.svg)](https://travis-ci.org/far20/ReactTimeseries)
[![far20OSS Lifecycle](https://img.shields.io/osslifecycle/far20/ReactTimeseries.svg)]()
[![License](https://img.shields.io/github/license/far20/ReactTimeseries.svg)](http://www.apache.org/licenses/LICENSE-2.0)

ReactTimeseries is a visualization component for different time series as a combination of line, bar and scater charts, allowing quick analysis of different time series data from sources like perturbations, variance, single-threaded execution, and more.

ReactTimeseries begins by displaying the input data as an interactive subsecond-offset graph. This shows patterns in the data. You can then select a time range to highlight on different patterns, and a flame graph will be generated just for that time range.

## Disclaimer

ReactTimeseries is in early stages of development and under constant change, so bugs and issues are expected. We count on your support to find and report them!

## Installation / Instructions

The quickest way to get started is to run the pre-built client bundle:

```bash
npm install react-timeseries
```

(Note python3 is assumed, python2 _may_ work)

Then browse to http://127.0.0.1:5000/, and you can begin exploring profiles from the `examples` directory. You can add new profiles to that directory, collected using Linux `perf`. Here are instructions for a generic CPU profile at 49 Hertz for 120 seconds:

```bash
$ sudo perf record -F 49 -a -g -- sleep 120
$ sudo perf script --header > stacks.myproductionapp.2018-03-30_01
$ gzip stacks.myproductionapp.2018-03-30_01	# optional
```

If you are profiling C++ code, you may want to pipe stacks through `c++filt` to get readable frames.

There are extra steps to fetch stacks correctly for some runtimes, depending on the runtime. For example, we've previously published Java steps in [Java in Flames](https://medium.com/far20-techblog/java-in-flames-e763b3d32166): java needs to be running with the -XX:+PreserveFramePointer option, and [perf-map-agent](https://github.com/jvm-profiling-tools/perf-map-agent) must be run immediately after the `perf record` to dump a JIT symbol table in /tmp.

ReactTimeseries can visualize any Linux `perf script` output that includes stack traces, including page faults, context switches, and other events. See the References section below for documentation.

ReactTimeseries is composed of two main components, the Python backend, and a React client interface. A pre-built client bundle is distributed with the backend, so the quickest way to get started is to install the Python requirements and start the application, as described earlier.

Although not necessary, we **strongly** suggest using [virtualenv](https://github.com/pypa/virtualenv) to isolate your Python environment.

By default, ReactTimeseries will load a list of files from the `examples` directory, which includes a two profile examples.

## Configuration Options

ReactTimeseries configuration file can be found in `app/config.py`.

```python
DEBUG = True # run the web server in debug mode
PROFILE_DIR = 'examples' # path where ReactTimeseries will look for profiles
HOST = '127.0.0.1' # web server host
PORT = 5000 # web server port
JSONIFY_PRETTYPRINT_REGULAR = False # pretty print api json responses
```

## Building Client from Source

In order to build the client application from source, the following command line tools must be installed:

- [Node.js/Npm](https://nodejs.org/en/download/)
- [Yarn](https://yarnpkg.com/lang/en/docs/install/)

Once those tools are available, you will be able to install the project dependencies and generate a build.

```bash
$ yarn install
$ npm run webpack
```

The `npm run webpack` command will generate a new build under `app/public`. This directory is exposed by the Python web server.

Webpack can also watch and recompile files whenever they change. To build and start the _watch_ task, run the following command:

```bash
$ npm run webpack-watch
```

## Building a Docker Image

ReactTimeseries provides a Dockerfile to build a Docker image:

```bash
$ cd ReactTimeseries
$ docker build -t ReactTimeseries .
```

The container expects the profiles to be bind-mounted into `/profiles` and listens on port 5000. To view profiles from `/tmp/profiles`, start the container with the following command:

```
$ docker run --rm -it -v /tmp/profiles:/profiles:ro -p 5000:5000 ReactTimeseries
```

Then access ReactTimeseries on [http://127.0.0.1:5000](http://127.0.0.1:5000/)
