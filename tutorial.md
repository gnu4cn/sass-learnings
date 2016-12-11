# Sass(Syntactically Awesome StyleSheets)

原文/Source: [SASS REFERENCE](http://sass-lang.com/documentation/file.SASS_REFERENCE.html)

Sass 是一个CSS的扩展，为CSS这一基础语言加入力量与优雅。Sass让你可以用上变量、嵌套规则、mixins、行内导入（inline imports），以及其它特性，且实在完全兼容CSS的语法下。Sass令到大型的样式表保持有序，同时让那些较小的样式表高速运行，特别是在[Compass样式库](http://compass-style.org/)的助力下。

*译者注*：在使用现有css样式框架（如bootstrap, material design等），要自己编写的CSS样式表很少，但作为开发中决定应用外观的重要一环，如能掌握Sass这一CSS编程方法，定能更为游刃有余。

## 特性

- Sass完全兼容CSS
- 有着诸如变量、嵌套及mixins这样的语言扩展
- 有着用于对颜色及其它值进行操作的函数
- 有着一些比如各种库的控制指令等高级特性
- Sass代码格式优良，同时其输出可以定制

## 语法

Sass有两种语法。一种叫做SCSS（Sassy CSS），也就是本参考手册中用到的语法，是CSS语法的一个扩展。这就是说所有有效的CSS样式表，也都是有效的SCSS文件。此外SCSS还能理解大多数对CSS的hacks, 及一些特定厂商的语法，比如[IE中原先的过滤器语法](http://msdn.microsoft.com/en-us/library/ms530752.aspx)。此种语法在下面将要讲到的那些特性上进行了加强。采用这种语法的文件，使用`.scss`扩展。

第二种语法，也就是旧有的语法，叫做缩进语法，提供了一种编写CSS的更为简洁的方式。其使用缩进而不是花括号，来表示选择符的嵌套、使用新行而不是分号，来对属性值进行分隔。一些人发现这种语法相比SCSS读起来更容易，写起来更快速。缩进语法有着与SCSS相同的特性，但其中一些特性可能有些许不同的语法；这在[intended syntax reference](http://sass-lang.com/documentation/file.INDENTED_SYNTAX.html)中有讲到。使用这种语法的文件，有着`.sass`扩展名。

两种语法之间可以相互导入以另一中语法编写的文件。使用命令行工具`sass-convert`，可从一种语法自动转换到另一种语法：

```bash
# 将 Sass 转换为 SCSS
$ sass-convert style.sass style.scss

# 将 SCSS 转换为 Sass
$ sass-convert style.scss style.sass
```

请注意该命令并不会生成CSS文件。要生成CSS文件，就要使用别处所讲到的`sass`命令了。

## 使用Sass

使用Sass有三种方式：作为一个命令行工具、作为一个单独的Ruby模块，以及作为包括Ruby on Rails与Merb等的任何开启了Rack的框架的一个插件来进行使用。但不管是命令行工具、Ruby模块，还是框架的插件，第一步都要安装Sass gem:

```bash
sudo gem install sass
```

此后，只需像下面这样，就可以从命令行运行Sass了：

```bash
sass input.scss output.css
```

还可以让Sass对文件进行监视，在Sass文件每次发生变化时，自动更新生成的CSS文件：

```bash
sass --watch input.scss:output.css
```

而假如有着一个包含了很多Sass文件的目录，就可以让Sass对整个目录进行监视：

```bash
sass --watch app/sass:public/stylesheets
```

请使用`sass --help`来查看完整的文档。

*译者注*：在实际的应用开发中，往往要使用到自动构建工具[gulp](http://gulpjs.com/), 通过[gulp的sass插件](https://www.npmjs.com/package/gulp-sass)来完成Sass的编译（从Sass生成CSS）。

