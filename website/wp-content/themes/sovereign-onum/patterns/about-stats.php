<?php
/**
 * About section with circular stats.
 *
 * @package Sovereign_Onum
 */

$about_img = sovereign_onum_image_url( 'team-collaboration.jpg' );

return array(
	'name'        => 'sovereign-onum/about-stats',
	'title'       => __( 'About with Stats', 'sovereign-onum' ),
	'description' => _x( 'Two-column about section with image and circular progress stats.', 'Block pattern description', 'sovereign-onum' ),
	'categories'  => array( 'sovereign-onum-sections' ),
	'content'     => '<!-- wp:group {"align":"full","layout":{"type":"constrained"}} -->
<div class="wp-block-group alignfull"><!-- wp:columns {"align":"wide","verticalAlignment":"center","style":{"spacing":{"blockGap":{"left":"var:preset|spacing|3xl"}}}} -->
<div class="wp-block-columns alignwide are-vertically-aligned-center"><!-- wp:column {"width":"45%"} -->
<div class="wp-block-column" style="flex-basis:45%"><!-- wp:image {"sizeSlug":"large","linkDestination":"none","className":"so-about-image"} -->
<figure class="wp-block-image size-large so-about-image"><img src="' . esc_url( $about_img ) . '" alt="Team collaborating on sovereign AI deployment"/></figure>
<!-- /wp:image --></div>
<!-- /wp:column -->

<!-- wp:column {"width":"55%"} -->
<div class="wp-block-column" style="flex-basis:55%"><!-- wp:paragraph {"className":"so-eyebrow is-primary"} -->
<p class="so-eyebrow is-primary">About us</p>
<!-- /wp:paragraph -->

<!-- wp:heading {"style":{"typography":{"fontFamily":"var:preset|font-family|red-hat-display","fontSize":"var:preset|font-size|4xl"}},"textColor":"text-dark"} -->
<h2 class="wp-block-heading has-text-dark-color has-text-color">Grow your firm with sovereign AI</h2>
<!-- /wp:heading -->

<!-- wp:paragraph {"textColor":"text"} -->
<p class="has-text-color has-text-color">We help Australian organisations deploy private AI that meets regulatory expectations — without sending data offshore or paying perpetual SaaS fees.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph {"textColor":"text"} -->
<p class="has-text-color has-text-color">From mid-market law firms to mutual banks, we deliver ChatGPT-class experiences on infrastructure you control. Book a discovery call to see it live.</p>
<!-- /wp:paragraph -->

<!-- wp:buttons {"style":{"spacing":{"margin":{"top":"var:preset|spacing|lg"}}}} -->
<div class="wp-block-buttons" style="margin-top:var(--wp--preset--spacing--lg)"><!-- wp:button {"className":"so-btn-cyan"} -->
<div class="wp-block-button so-btn-cyan"><a class="wp-block-button__link wp-element-button" href="/about">Learn More</a></div>
<!-- /wp:button --></div>
<!-- /wp:buttons --></div>
<!-- /wp:column --></div>
<!-- /wp:columns -->

<!-- wp:columns {"align":"wide","style":{"spacing":{"margin":{"top":"var:preset|spacing|3xl"},"blockGap":{"left":"var:preset|spacing|xl"}}}} -->
<div class="wp-block-columns alignwide" style="margin-top:var(--wp--preset--spacing--3xl)"><!-- wp:column -->
<div class="wp-block-column"><!-- wp:group {"className":"so-stat-ring so-stat-ring--75","layout":{"type":"default"}} -->
<div class="wp-block-group so-stat-ring so-stat-ring--75"><!-- wp:html -->
<div class="so-stat-ring__circle"><span>75%</span></div>
<!-- /wp:html -->

<!-- wp:heading {"textAlign":"center","level":4,"textColor":"text-dark"} -->
<h4 class="wp-block-heading has-text-align-center has-text-dark-color has-text-color">Data sovereignty</h4>
<!-- /wp:heading -->

<!-- wp:paragraph {"align":"center","textColor":"text-muted","fontSize":"small"} -->
<p class="has-text-align-center has-text-muted-color has-small-font-size has-text-color">Australian-hosted by default</p>
<!-- /wp:paragraph --></div>
<!-- /wp:group --></div>
<!-- /wp:column -->

<!-- wp:column -->
<div class="wp-block-column"><!-- wp:group {"className":"so-stat-ring so-stat-ring--43","layout":{"type":"default"}} -->
<div class="wp-block-group so-stat-ring so-stat-ring--43"><!-- wp:html -->
<div class="so-stat-ring__circle"><span>43%</span></div>
<!-- /wp:html -->

<!-- wp:heading {"textAlign":"center","level":4,"textColor":"text-dark"} -->
<h4 class="wp-block-heading has-text-align-center has-text-dark-color has-text-color">Faster deployment</h4>
<!-- /wp:heading -->

<!-- wp:paragraph {"align":"center","textColor":"text-muted","fontSize":"small"} -->
<p class="has-text-align-center has-text-muted-color has-small-font-size has-text-color">vs. building in-house</p>
<!-- /wp:paragraph --></div>
<!-- /wp:group --></div>
<!-- /wp:column -->

<!-- wp:column -->
<div class="wp-block-column"><!-- wp:group {"className":"so-stat-ring so-stat-ring--66","layout":{"type":"default"}} -->
<div class="wp-block-group so-stat-ring so-stat-ring--66"><!-- wp:html -->
<div class="so-stat-ring__circle"><span>66%</span></div>
<!-- /wp:html -->

<!-- wp:heading {"textAlign":"center","level":4,"textColor":"text-dark"} -->
<h4 class="wp-block-heading has-text-align-center has-text-dark-color has-text-color">Cost reduction</h4>
<!-- /wp:heading -->

<!-- wp:paragraph {"align":"center","textColor":"text-muted","fontSize":"small"} -->
<p class="has-text-align-center has-text-muted-color has-small-font-size has-text-color">vs. Copilot at scale</p>
<!-- /wp:paragraph --></div>
<!-- /wp:group --></div>
<!-- /wp:column -->

<!-- wp:column -->
<div class="wp-block-column"><!-- wp:group {"className":"so-stat-ring so-stat-ring--15","layout":{"type":"default"}} -->
<div class="wp-block-group so-stat-ring so-stat-ring--15"><!-- wp:html -->
<div class="so-stat-ring__circle"><span>5d</span></div>
<!-- /wp:html -->

<!-- wp:heading {"textAlign":"center","level":4,"textColor":"text-dark"} -->
<h4 class="wp-block-heading has-text-align-center has-text-dark-color has-text-color">To first pilot</h4>
<!-- /wp:heading -->

<!-- wp:paragraph {"align":"center","textColor":"text-muted","fontSize":"small"} -->
<p class="has-text-align-center has-text-muted-color has-small-font-size has-text-color">QuickStart package</p>
<!-- /wp:paragraph --></div>
<!-- /wp:group --></div>
<!-- /wp:column --></div>
<!-- /wp:columns --></div>
<!-- /wp:group -->',
);
