<?php
namespace ImageWatermark;

function register_settings_section() {
    $section = 'image_watermark_section';

    add_settings_section(  
        $section,
        'Image Watermark',
        '', 
        'media'
    );

    add_settings_field(
        'image_watermark_id',
        'Watermark image',
        function () {
            $value = get_option('image_watermark_id');

            echo '<input type="number" name="image_watermark_id" value="' . $value . '">';
        },
        'media',
        $section
    ); 
}

function register_options() {
    register_setting(
        'media',
        'image_watermark_id',
        [
            'type' => 'boolean',
            'sanitize_callback' => 'intval',
            'default' => false,
            'show_in_rest' => true,
        ]
    );
};
