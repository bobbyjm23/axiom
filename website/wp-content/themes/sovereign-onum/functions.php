<?php
/**
 * Sovereign Onum theme functions.
 *
 * @package Sovereign_Onum
 */

declare(strict_types=1);

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

define( 'SOVEREIGN_ONUM_VERSION', '1.0.0' );

/**
 * Theme stock image URL.
 *
 * @param string $filename Image filename in assets/images/.
 * @return string
 */
function sovereign_onum_image_url( string $filename ): string {
	return get_template_directory_uri() . '/assets/images/' . ltrim( $filename, '/' );
}

/**
 * Gutenberg image block markup for a theme stock image.
 *
 * @param string $filename Image filename.
 * @param string $alt      Alt text.
 * @param string $class    Optional CSS class.
 * @return string
 */
function sovereign_onum_image_block( string $filename, string $alt, string $class = 'so-image' ): string {
	$url   = esc_url( sovereign_onum_image_url( $filename ) );
	$alt   = esc_attr( $alt );
	$class = esc_attr( $class );

	return '<!-- wp:image {"sizeSlug":"large","linkDestination":"none","className":"' . $class . '"} -->
<figure class="wp-block-image size-large ' . $class . '"><img src="' . $url . '" alt="' . $alt . '"/></figure>
<!-- /wp:image -->';
}

/**
 * Register navigation menu locations.
 */
function sovereign_onum_register_menus(): void {
	add_theme_support( 'post-thumbnails' );
	register_nav_menus(
		array(
			'primary' => __( 'Primary Navigation', 'sovereign-onum' ),
			'footer'  => __( 'Footer Navigation', 'sovereign-onum' ),
		)
	);
}
add_action( 'after_setup_theme', 'sovereign_onum_register_menus' );

/**
 * Enqueue theme assets.
 */
function sovereign_onum_enqueue_assets(): void {
	wp_enqueue_style(
		'sovereign-onum-fonts',
		'https://fonts.googleapis.com/css2?family=Red+Hat+Display:ital,wght@0,400;0,500;0,700;0,900;1,400&family=Red+Hat+Text:ital,wght@0,400;0,500;0,700;1,400&display=swap',
		array(),
		null
	);

	wp_enqueue_style(
		'sovereign-onum-style',
		get_stylesheet_uri(),
		array( 'sovereign-onum-fonts' ),
		SOVEREIGN_ONUM_VERSION
	);

	wp_enqueue_style(
		'sovereign-onum-theme',
		get_template_directory_uri() . '/assets/css/theme.css',
		array( 'sovereign-onum-style' ),
		SOVEREIGN_ONUM_VERSION
	);
}
add_action( 'wp_enqueue_scripts', 'sovereign_onum_enqueue_assets' );
add_action( 'enqueue_block_editor_assets', 'sovereign_onum_enqueue_assets' );

/**
 * Register block pattern categories.
 */
function sovereign_onum_register_pattern_categories(): void {
	register_block_pattern_category(
		'sovereign-onum',
		array(
			'label' => __( 'Sovereign Onum', 'sovereign-onum' ),
		)
	);

	register_block_pattern_category(
		'sovereign-onum-heroes',
		array(
			'label' => __( 'Sovereign Onum — Heroes', 'sovereign-onum' ),
		)
	);

	register_block_pattern_category(
		'sovereign-onum-sections',
		array(
			'label' => __( 'Sovereign Onum — Sections', 'sovereign-onum' ),
		)
	);
}
add_action( 'init', 'sovereign_onum_register_pattern_categories' );

/**
 * Register block patterns from the patterns directory.
 */
function sovereign_onum_register_patterns(): void {
	$pattern_files = glob( get_template_directory() . '/patterns/*.php' );
	if ( ! $pattern_files ) {
		return;
	}

	foreach ( $pattern_files as $pattern_file ) {
		$pattern_data = require $pattern_file;
		if ( is_array( $pattern_data ) && ! empty( $pattern_data['name'] ) ) {
			$pattern_name = $pattern_data['name'];
			unset( $pattern_data['name'] );
			register_block_pattern( $pattern_name, $pattern_data );
		}
	}
}
add_action( 'init', 'sovereign_onum_register_patterns' );
