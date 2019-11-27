# Deployment Guide

1. Run tests

```
npm run test
```

2. Commit changes to Git

3. Create new package version number

```
npm version <patch | minor | major>
```

4. Build package

```
npm run build
npm run compile
```

5. Publish package to npmjs.com

```
npm publish --access public
```