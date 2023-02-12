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

function image_watermark_register_settings_section() {
    $section = 'image_watermark_section';

    add_settings_section(  
        $section,
        'Image Watermark',
        '', 
        'media'
    );
}

add_action('admin_init', function () {
    image_watermark_register_settings_section();
});
