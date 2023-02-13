<?php
namespace ImageWatermark\Upload;


function enqueue_upload_assets() {
    $current_screen = get_current_screen();
    $options_page_id = 'upload';

    if ($current_screen instanceof \WP_Screen
        &&  $options_page_id === $current_screen->id
    ) {
        $assets_file = require_once(IMAGE_WATERMARK_PATH . 'build/admin/upload.asset.php');

        wp_enqueue_style("wp-components");
        wp_enqueue_media();
        wp_enqueue_script(
            'image-watermark-upload-js',
            IMAGE_WATERMARK_URL . 'build/admin/upload.js',
            // $assets_file['dependencies'],
            ['jquery', 'wp-api', 'media', 'media-editor'],
            $assets_file['version'],
            true
        );
    }
}
