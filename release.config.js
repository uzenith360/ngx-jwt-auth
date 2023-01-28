module.exports = {
    branches: [
      'main',
      {
        name: 'beta',
        prerelease: true
      }
    ],
    plugins: [
      '@semantic-release/commit-analyzer',
      '@semantic-release/release-notes-generator',
      [
        '@semantic-release/changelog',
        {
          changelogFile: 'CHANGELOG.md'
        }
      ],
      ["@semantic-release/npm", {
        "pkgRoot": "dist/ngx-jwt-auth",
      }],
      '@semantic-release/github',
      [
        '@semantic-release/git',
        {
          assets: ['CHANGELOG.md', 'dist/**'],
          message: 'chore(release): set `package.json` to ${nextRelease.version} [skip ci]\n\n${nextRelease.notes}'
        }
      ]
    ]
  }