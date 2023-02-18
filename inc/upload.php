<?php
namespace ImageWatermark\Upload;

function enqueue_upload_assets() {
    $current_screen = get_current_screen();
    $options_page_id = 'upload';

    if ($current_screen instanceof \WP_Screen
        &&  $options_page_id === $current_screen->id
    ) {
        $assets_file = require_once(IMAGE_WATERMARK_PATH . 'build/admin/upload/index.asset.php');

        wp_enqueue_media();
        wp_enqueue_script(
            'image-watermark-upload-js',
            IMAGE_WATERMARK_URL . 'build/admin/upload/index.js',
            // ,
            array_merge($assets_file['dependencies'], ['jquery']),
            $assets_file['version'],
            true
        );
        wp_enqueue_style(
            'image-watermark-upload-css',
            IMAGE_WATERMARK_URL . 'build/admin/upload/style-index.css',
            [],
            $assets_file['version']
        );
    }
}
