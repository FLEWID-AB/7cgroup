<?php
  /*
  Template Name: Index Template
  */
?>
<?php
  $args = array(
  'post_parent' => $post->ID,
  'post_type'   => 'page', 
  'posts_per_page' => -1,
  'orderby' => 'menu_order',
  'order' => 'ASC',
  'post_status' => 'publish'
  );
  $children = get_children($args);
?>
<!-- LOOP THROUGH ALL THE CHILDRENS AS THEY WILL MAKE THE PAGE -->

    <?php if (count($children) > 0) { ?>
    <?php foreach((array) $children as $child_id => $child ){ ?>

    <?php if (get_field('page-type', $child->ID) == 'slider') { ?>
    <?php $slider_items = get_field('slider', $child->ID) ?>

    <?php if (count($slider_items) > 0) { ?>
    <div class='slider'>
  <?php foreach( $slider_items as $image ): ?>
  <?php $background_image = $image['sizes']['xxl'] ?>
  <div class='full-size-background' style='background-image: url(<?php echo $background_image ?>)'>
    <div class='item'>
      <h3>
        <?php echo $image['title'] ?>
      </h3>
      
          <?php if ($image['description']) { ?>
          <p>
        <?php echo $image['description'] ?>
      </p>
      
          <?php } ?>
      <?php $url = get_post_meta($image['id'],'_www',true) ?>
      
          <?php if ($url) { ?>
          <a class='button tiny radius' href='<?php echo $url ?>'>
        Read more
      </a>
      
          <?php } ?>
    </div>
  </div>
  <?php endforeach; ?>
</div>

    <?php } ?>

    <?php } ?>
<?php } ?>

    <?php } ?>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
</div>
<a class="exit-off-canvas"></a>
