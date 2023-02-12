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

require_once plugin_dir_path(__FILE__) . "vendor/autoload.php";

add_action('admin_init', function () {
    \ImageWatermark\register_options();
    \ImageWatermark\register_settings_section();    
});

add_action('rest_api_init', function () {
    \ImageWatermark\register_options();
    
});
