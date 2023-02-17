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
![set](https://user-images.githubusercontent.com/57893611/218752063-182387f0-af22-4385-b3f6-49b6785c814f.PNG)

### Add for a single image
1. In **Media > Library**, select an Image and click on **Add watermark** button to generate the **marked** image.
![att](https://user-images.githubusercontent.com/57893611/218752141-70c38519-aa66-4d5a-a7da-53ba4fc3620b.PNG)

2. Once the new marked image created, a popup will redirect to the new image
![image](https://user-images.githubusercontent.com/57893611/219758607-87f37a0e-3aa5-4946-a5da-026cca861c2d.png)

3. Refresh the page to see the new marked image in the **Media Library**
![res](https://user-images.githubusercontent.com/57893611/218752181-abf162bc-7b08-461b-b45d-b489663f7ae0.PNG)

### Add for multiple images
1. In **Media > Library**, click on **Bulk Select** button and select images to mark and click on **Add Watermark** button
![image](https://user-images.githubusercontent.com/57893611/219759003-31c76bde-f610-4306-b7f4-70ac3ad711e8.png)

2. Once the new marked images created, a popup will show the count of new images added
![image](https://user-images.githubusercontent.com/57893611/219759343-ccd7c1b3-bd5e-4a8e-a58f-68c2253b0f82.png)



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
