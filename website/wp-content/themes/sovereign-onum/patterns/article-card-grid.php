<?php
/**
 * Article card grid.
 *
 * @package Sovereign_Onum
 */

return array(
	'name'        => 'sovereign-onum/article-card-grid',
	'title'       => __( 'Article Card Grid', 'sovereign-onum' ),
	'description' => _x( 'Latest insights posts in a card grid.', 'Block pattern description', 'sovereign-onum' ),
	'categories'  => array( 'sovereign-onum-sections' ),
	'content'     => '<!-- wp:group {"align":"full","className":"so-section-alt","layout":{"type":"constrained"}} -->
<div class="wp-block-group alignfull so-section-alt"><!-- wp:paragraph {"className":"so-eyebrow"} -->
<p class="so-eyebrow">Insights</p>
<!-- /wp:paragraph -->

<!-- wp:heading {"style":{"typography":{"fontFamily":"var:preset|font-family|red-hat-display","fontSize":"var:preset|font-size|4xl"}},"textColor":"text-dark"} -->
<h2 class="wp-block-heading has-text-dark-color has-text-color">Latest from Sovereign Warden</h2>
<!-- /wp:heading -->

<!-- wp:query {"queryId":1,"query":{"perPage":3,"pages":0,"offset":0,"postType":"post","order":"desc","orderBy":"date","author":"","search":"","exclude":[],"sticky":"","inherit":false},"align":"wide","style":{"spacing":{"margin":{"top":"var:preset|spacing|2xl"}}}} -->
<div class="wp-block-query alignwide" style="margin-top:var(--wp--preset--spacing--2xl)"><!-- wp:post-template {"layout":{"type":"grid","columnCount":3}} -->
<!-- wp:group {"className":"so-service-card","style":{"spacing":{"padding":{"top":"0","right":"0","bottom":"var:preset|spacing|lg","left":"0"}}},"layout":{"type":"default"}} -->
<div class="wp-block-group so-service-card" style="padding-top:0;padding-right:0;padding-bottom:var(--wp--preset--spacing--lg);padding-left:0"><!-- wp:post-featured-image {"isLink":true,"aspectRatio":"16/10","style":{"border":{"radius":"8px"}}} /-->

<!-- wp:post-title {"level":3,"isLink":true,"style":{"spacing":{"padding":{"top":"var:preset|spacing|md","right":"var:preset|spacing|lg","left":"var:preset|spacing|lg"}}},"fontSize":"large"} /-->

<!-- wp:post-excerpt {"moreText":"Read more →","excerptLength":20,"style":{"spacing":{"padding":{"right":"var:preset|spacing|lg","left":"var:preset|spacing|lg"}}},"fontSize":"small"} /--></div>
<!-- /wp:group -->
<!-- /wp:post-template --></div>
<!-- /wp:query --></div>
<!-- /wp:group -->',
);
