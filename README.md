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

3. In **Settings > Media**, in **Image Watermark** section, select the image to use as watermark and its position.
![watermark](https://user-images.githubusercontent.com/57893611/218743476-51392fd6-4f04-4f3e-a82d-77140507fc22.PNG)

4. In **Media > Library**, select an Image and click on **Add watermark** button to generate the **marked** image.
![Capture](https://user-images.githubusercontent.com/57893611/218743803-5bfd8ab1-b0ae-4e9a-8aad-5c7425891c6c.PNG)

5. A new image will then be created and addded to the **Media Library**.
![image](https://user-images.githubusercontent.com/57893611/218744047-4d8cee6d-4714-4df8-aafb-68073d6a4fce.png)


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
