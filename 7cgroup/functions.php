<?php
/**
 * Roots includes
 *
 * The $roots_includes array determines the code library included in your theme.
 * Add or remove files to the array as needed. Supports child theme overrides.
 *
 * Please note that missing files will produce a fatal error.
 *
 * @link https://github.com/roots/roots/pull/1042
 */
$roots_includes = array(
  'lib/utils.php',           // Utility functions
  'lib/init.php',            // Initial theme setup and constants
  'lib/wrapper.php',         // Theme wrapper class
  'lib/sidebar.php',         // Sidebar class
  'lib/config.php',          // Configuration
  'lib/activation.php',      // Theme activation
  'lib/titles.php',          // Page titles
  'lib/nav.php',             // Custom nav modifications
  'lib/pagination.php',      // Custom pagination
  'lib/gallery.php',         // Custom [gallery] modifications
  'lib/comments.php',        // Custom comments modifications
  'lib/scripts.php',         // Scripts and stylesheets
  'lib/extras.php',          // Custom functions
);

foreach ($roots_includes as $file) {
  if (!$filepath = locate_template($file)) {
    trigger_error(sprintf(__('Error locating %s for inclusion', 'roots'), $file), E_USER_ERROR);
  }

  require_once $filepath;
}
unset($file, $filepath);



/**
 * Add custom media metadata fields
 *
 * Be sure to sanitize your data before saving it
 * http://codex.wordpress.org/Data_Validation
 *
 * @param $form_fields An array of fields included in the attachment form
 * @param $post The attachment record in the database
 * @return $form_fields The final array of form fields to use
 */
function add_image_attachment_fields_to_edit( $form_fields, $post ) {
    
    // Remove the "Description" field, we're not using it
    unset( $form_fields['post_content'] ); 
    
    // Add description text (helps) to the "Title" field
    $form_fields['post_title']['helps'] = 'Use a descriptive title for the image. This will make it easy to find the image in the future and will improve SEO.';
        
    // Re-order the "Caption" field by removing it and re-adding it later
    $form_fields['post_excerpt']['helps'] = 'Describe the significants of the image pertaining to the site.';
    $caption_field = $form_fields['post_excerpt'];
    unset($form_fields['post_excerpt']);
    
    // Re-order the "File URL" field
    $image_url_field = $form_fields['image_url'];
    unset($form_fields['image_url']);
  
 
    // Add a Credit field
    $form_fields["www"] = array(
        "label" => __("www"),
        "input" => "text", // this is default if "input" is omitted
        "value" => get_post_meta($post->ID, "_www", true) ,
        "helps" => __("Lägg till länk på slidern"),
    );
    
    // Add Caption before Credit field 
    $form_fields['image_url'] = $image_url_field;
    
    return $form_fields;
}
add_filter("attachment_fields_to_edit", "add_image_attachment_fields_to_edit", 10, 2);







/**
 * Save custom media metadata fields
 *
 * Be sure to validate your data before saving it
 * http://codex.wordpress.org/Data_Validation
 *
 * @param $post The $post data for the attachment
 * @param $attachment The $attachment part of the form $_POST ($_POST[attachments][postID])
 * @return $post
 */
function add_image_attachment_fields_to_save( $post, $attachment ) {
    if ( isset( $attachment['www'] ) )
        update_post_meta( $post['ID'], '_www', esc_attr($attachment['www']) );
        
    return $post;
}
add_filter("attachment_fields_to_save", "add_image_attachment_fields_to_save", 10 , 2);
