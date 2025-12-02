# TODO(brian) wrap in Tilt extension if works for team
def dotenv(fn=".env", verbose=False, showValues=False):
    if not os.path.exists(fn):
        warn("Environment variables file not found: '%s'" % fn)
        return {}

    if verbose:
        print("Loading environment variables from file: '%s'" % fn)

    f = read_file(fn)
    lines = str(f).splitlines()

    env = {}
    lineNumber = 0

    while lineNumber < len(lines):
        line = lines[lineNumber]
        lineNumber += 1

        if line.startswith("#"):
            continue

        v = line.split("=", 1)

        if len(v) < 2:
            if len(line) > 0:
                fail("Invalid format for dotenv file: '%s' in '%s:%s'" % (line, fn, lineNumber+1))
            continue

        varName = v[0].strip()
        varValue = v[1].strip()

        # multiline quoted
        if varValue.startswith('"') and not varValue.endswith('"'):
            value_lines = [v[1].lstrip()]
            while lineNumber < len(lines):
                next_line = lines[lineNumber]
                lineNumber += 1
                stripped = next_line.rstrip()
                if stripped.endswith('"'):
                    value_lines.append(stripped)
                    break
                value_lines.append(next_line)
            varValue = "\n".join(value_lines)

        # strip surrounding quotes
        if (varValue.startswith('"') and varValue.endswith('"')) or \
           (varValue.startswith("'") and varValue.endswith("'")):
            varValue = varValue[1:-1]

        if verbose:
            if showValues:
                print("Loading environment variable: %s=%s" % (varName, varValue))
            else:
                print("Loading environment variable: %s" % varName)

        env[varName] = varValue

    return env

env_local = dotenv(".env.local")
project_name = "backfeed-app"

local_resource(
    "install-deps-%s" % project_name,
    cmd="bun i",
    deps=["package.json"],
    labels=[project_name],
)

local_resource(
    "dev-%s" % project_name,
    serve_cmd="bun dev",
    labels=[project_name],
    env=env_local,
)
