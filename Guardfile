require 'haml/helpers'
require 'haml/filters'
require 'haml/filters/php'
# A sample Guardfile
# More info at https://github.com/guard/guard#readme

# This will concatenate the javascript files specified in :files to public/js/all.js
# Sample guardfile block for Guard::Haml
# You can use some options to change guard-haml configuration
# output: 'public'                   set output directory for compiled files
# input: 'src'                       set input directory with haml files
# run_at_start: true                 compile files when guard starts
# notifications: true                send notifictions to Growl/libnotify/Notifu
# haml_options: { ugly: true }    pass options to the Haml engine

guard :haml, input: '7cgroup/templates/haml', output: '7cgroup/templates', :haml_options => { :escape_attrs => false } do
  watch %r{^7cgroup/templates/haml/.+(\.haml)$}
end

guard :haml, input: '7cgroup/haml', output: '7cgroup/', :haml_options => { :escape_attrs => false } do
  watch %r{^7cgroup/haml/.+(\.haml)$}
end

ignore([%r{^7cgroup/node_modules/*}, %r{^7cgroup/bower_components/*}])

module ::Haml::Helpers
  
  # Implements the Paul Irish IE conditional comments HTML tag--in HAML.
  # http://paulirish.com/2008/conditional-stylesheets-vs-css-hacks-answer-neither/
  def cc_html(options={}, &blk)
    attrs = options.map { |(k, v)| " #{h k}='#{h v}'" }.join('')
    [ "<!--[if lt IE 7 ]> <html#{attrs} class='lt-ie9'> <![endif]-->",
      "<!--[if IE 7 ]>    <html#{attrs} class='lt-ie9'> <![endif]-->",
      "<!--[if IE 8 ]>    <html#{attrs} class='lt-ie9'> <![endif]-->",
      "<!--[if IE 9 ]>    <html#{attrs} class='lt-ie9'> <![endif]-->",
      "<!--[if (gt IE 9)|!(IE)]><!--> <html#{attrs}> <!--<![endif]-->",
      capture_haml(&blk).strip,
      ""
    ].join("\n")
  end

  def h(str); str end

  def php(text)
    "<?php #{text} ?>"
  end

  def php_echo(text)
    php %(echo #{text})
  end
  
  def php_if(condition, more_conditionals = false, &block)
    php_condition condition, 'if', more_conditionals, &block
  end
  
  def php_else_if(condition, more_conditionals = false, &block)
    php_condition condition, '} else if', more_conditionals, &block
  end
  
  def php_else(&block)
    %(
      #{php "} else {"}
      #{capture_haml(&block)}
      #{php "}" }
    )
  end
  
  private
  
  def php_condition(condition, conditional, more_conditionals = false, &block)
    %(
    #{php "#{conditional} (#{condition}) {"}
    #{capture_haml(&block)}
    #{php '}' unless more_conditionals}
    )
  end
end
