<?php

/**
 * Plugin Name:         Image Watermark
 *
 * Description:         Add a watermark to your images in WordPress Media Library.
 * Author:              JimJ92120
 * Author URI:          https://github.com/JimJ92120
 *
 * Version:             0.1.0
 * Requires at least:   5.9
 * Requires PHP:        7.4
 */

define('IMAGE_WATERMARK_PATH', plugin_dir_path(__FILE__));
define('IMAGE_WATERMARK_URL', plugin_dir_url(__FILE__));

require_once IMAGE_WATERMARK_PATH . "vendor/autoload.php";

add_action('admin_init', function () {
    \ImageWatermark\OptionsMedia\register_options();
    \ImageWatermark\OptionsMedia\register_settings_section();    
});

add_action('admin_enqueue_scripts', function () {
    \ImageWatermark\OptionsMedia\enqueue_settings_section_assets();
    \ImageWatermark\Upload\enqueue_upload_assets();
});

add_action('rest_api_init', function () {
    \ImageWatermark\register_options();
});

