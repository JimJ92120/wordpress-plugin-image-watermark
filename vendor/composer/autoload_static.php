<?php

// autoload_static.php @generated by Composer

namespace Composer\Autoload;

class ComposerStaticInita28d686b400929a8f5a5a83f4cd41d75
{
    public static $files = array (
        'a66c78956c1cce70f91272d434b317a6' => __DIR__ . '/../..' . '/inc/options-media.php',
        '99c2cb05e28507434971973eba4544c9' => __DIR__ . '/../..' . '/inc/upload.php',
    );

    public static $prefixLengthsPsr4 = array (
        'I' => 
        array (
            'ImageWatermark\\' => 15,
        ),
    );

    public static $prefixDirsPsr4 = array (
        'ImageWatermark\\' => 
        array (
            0 => '/',
        ),
    );

    public static $classMap = array (
        'Composer\\InstalledVersions' => __DIR__ . '/..' . '/composer/InstalledVersions.php',
    );

    public static function getInitializer(ClassLoader $loader)
    {
        return \Closure::bind(function () use ($loader) {
            $loader->prefixLengthsPsr4 = ComposerStaticInita28d686b400929a8f5a5a83f4cd41d75::$prefixLengthsPsr4;
            $loader->prefixDirsPsr4 = ComposerStaticInita28d686b400929a8f5a5a83f4cd41d75::$prefixDirsPsr4;
            $loader->classMap = ComposerStaticInita28d686b400929a8f5a5a83f4cd41d75::$classMap;

        }, null, ClassLoader::class);
    }
}
