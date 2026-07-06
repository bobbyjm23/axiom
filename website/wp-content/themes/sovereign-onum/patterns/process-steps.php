<?php
/**
 * Process steps — numbered cards.
 *
 * @package Sovereign_Onum
 */

return array(
	'name'        => 'sovereign-onum/process-steps',
	'title'       => __( 'Process Steps', 'sovereign-onum' ),
	'description' => _x( 'Three numbered process steps with large background numbers.', 'Block pattern description', 'sovereign-onum' ),
	'categories'  => array( 'sovereign-onum-sections' ),
	'content'     => '<!-- wp:group {"align":"full","className":"so-section-alt","layout":{"type":"constrained"}} -->
<div class="wp-block-group alignfull so-section-alt"><!-- wp:paragraph {"align":"center","className":"so-eyebrow"} -->
<p class="has-text-align-center so-eyebrow">Verifiable results</p>
<!-- /wp:paragraph -->

<!-- wp:heading {"textAlign":"center","style":{"typography":{"fontFamily":"var:preset|font-family|red-hat-display","fontSize":"var:preset|font-size|4xl"}},"textColor":"text-dark"} -->
<h2 class="wp-block-heading has-text-align-center has-text-dark-color has-text-color">From pilot to production — we nail it every time</h2>
<!-- /wp:heading -->

<!-- wp:columns {"align":"wide","style":{"spacing":{"margin":{"top":"var:preset|spacing|2xl"},"blockGap":{"left":"var:preset|spacing|lg"}}}} -->
<div class="wp-block-columns alignwide" style="margin-top:var(--wp--preset--spacing--2xl)"><!-- wp:column -->
<div class="wp-block-column"><!-- wp:group {"className":"so-process-step","layout":{"type":"default"}} -->
<div class="wp-block-group so-process-step" data-step="01"><!-- wp:heading {"level":3,"textColor":"text-dark"} -->
<h3 class="wp-block-heading has-text-dark-color has-text-color">Ingest &amp; index</h3>
<!-- /wp:heading -->

<!-- wp:paragraph {"textColor":"text","fontSize":"small"} -->
<p class="has-text-color has-small-font-size has-text-color">Connect SharePoint, file shares, or uploads. Documents are chunked, embedded, and indexed in your private vector store.</p>
<!-- /wp:paragraph --></div>
<!-- /wp:group --></div>
<!-- /wp:column -->

<!-- wp:column -->
<div class="wp-block-column"><!-- wp:group {"className":"so-process-step","layout":{"type":"default"}} -->
<div class="wp-block-group so-process-step" data-step="02"><!-- wp:heading {"level":3,"textColor":"text-dark"} -->
<h3 class="wp-block-heading has-text-dark-color has-text-color">Chat with citations</h3>
<!-- /wp:heading -->

<!-- wp:paragraph {"textColor":"text","fontSize":"small"} -->
<p class="has-text-color has-small-font-size has-text-color">Employees ask questions in natural language. Every answer cites source documents — ready for compliance review.</p>
<!-- /wp:paragraph --></div>
<!-- /wp:group --></div>
<!-- /wp:column -->

<!-- wp:column -->
<div class="wp-block-column"><!-- wp:group {"className":"so-process-step","layout":{"type":"default"}} -->
<div class="wp-block-group so-process-step" data-step="03"><!-- wp:heading {"level":3,"textColor":"text-dark"} -->
<h3 class="wp-block-heading has-text-dark-color has-text-color">Deploy on-prem</h3>
<!-- /wp:heading -->

<!-- wp:paragraph {"textColor":"text","fontSize":"small"} -->
<p class="has-text-color has-small-font-size has-text-color">Migrate from cloud pilot to on-premises or air-gapped production. Same UX, your hardware, full data sovereignty.</p>
<!-- /wp:paragraph --></div>
<!-- /wp:group --></div>
<!-- /wp:column --></div>
<!-- /wp:columns --></div>
<!-- /wp:group -->',
);
