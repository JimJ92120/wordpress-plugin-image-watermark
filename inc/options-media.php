<?php
namespace ImageWatermark\OptionsMedia;

function register_settings_section() {
    $section = 'image_watermark_section';

    add_settings_section(  
        $section,
        'Image Watermark',
        function () {
            echo '<div id="image-watermark"></div>';
        },
        'media'
    );
}

function enqueue_settings_section_assets() {
    $current_screen = get_current_screen();
    $options_page_id = 'options-media';

    if ($current_screen instanceof \WP_Screen
        &&  $options_page_id === $current_screen->id
    ) {
        $assets_file = require_once(IMAGE_WATERMARK_PATH . 'build/admin/options-media.asset.php');

        wp_enqueue_media();
        wp_enqueue_style("wp-components");

        wp_enqueue_script(
            'image-watermark-options-js',
            IMAGE_WATERMARK_URL . 'build/admin/options-media.js',
            $assets_file['dependencies'],
            $assets_file['version'],
            true
        );
    }
}

function register_options() {
    register_setting(
        'media',
        'image_watermark_settings',
        [
            'type' => 'object',
            // 'sanitize_callback' => 'intval',
            'show_in_rest' => [
                'schema' => [
                    'type' => 'object',
                    'properties' => [
                        'image_id' => 'number',
                        'position' => 'number',
                    ],
                ],
            ],
            'default' => [
                'image_id' => null,
                'position' => null,
            ],
        ],
    );
};
