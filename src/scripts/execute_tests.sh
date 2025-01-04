#!/bin/sh
# Execute tests with Bun.
# NB: Bun test execution is handled by this script because of issues with patterns (glob expansion) not working properly across shells when test patterns are passed directly in `package.json` scripts. This file can be removed in favor of a direct `package.json` script once resolved. See https://discord.com/channels/876711213126520882/1184686223185432688/1184686223185432688

find src -type f \( -name "*.test.ts" -o -name "*.test.tsx" \) | xargs bun test
