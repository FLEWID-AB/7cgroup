<!DOCTYPE html>
<html class="no-js"<?php language_attributes(); ?>>
<head>
  <meta charset='utf-8'>
    <meta content='IE=edge' http-equiv='X-UA-Compatible'>
      <title>
        <?php wp_title('|', true, 'right'); ?>
      </title>
      <meta content='width=device-width, initial-scale=1' name='viewport'>
      <link href='//maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css' rel='stylesheet'>
      <?php wp_head(); ?>
      <link href='<?php echo esc_url(get_feed_link()); ?>' rel='alternate' title='<?php echo get_bloginfo('name'); ?> Feed' type='application/rss+xml'>
    </meta>
  </meta>
</head>
