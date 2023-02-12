# wordpress-plugin-image-watermark

Add a watermark to your images in WordPress Media Library.

---

## Requirements

### For plugin installation

|             |          |
| ----------- | -------- |
| `PHP`       | `>= 7.4` |
| `WordPress` | `>= 5.9` |

### For development

|            |           |
| ---------- | --------- |
| `npm`      | `>= 6.0`  |
| `node`     | `>= 14.0` |
| `composer` | `>= 2.4`  |

or

|             |          |
| ----------- | -------- |
| `PHP`       | `>= 7.4` |
| `WordPress` | `>= 5.9` |

---

## How to use

1. Download the `.zip` file and install **Image Watermark** plugin in WordPress.

2. Activate **Image Watermark** plugin.

---

## Development

Project is using:

- `@wordpress/env` for local development
- `composer` for `autoload` and namespaces
- `@wordpress/scripts` for assets building and compilation

1. Install `npm` and `composer` dependencies

```sh
npm install
```

2. Run `wp-env` environment

```sh
npm run wp-env start
```

3. Watch `src/` directory

```sh
npm run start
```

4. Build `src/` directory for **production**

```sh
npm run build
```

---
