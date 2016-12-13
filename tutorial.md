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

## Rack/Rails/Merb 插件

（此处略）。

## 缓存（Caching）

默认Sass将对那些模板与部分（[partials](http://sass-lang.com/documentation/file.SASS_REFERENCE.html#partials)）进行缓存。这样做可显著地提升大量Sass文件重新编译时的速度，同时在Sass模板被拆分到一些单独文件中，而全都通过`@import`到一个大型文件中时，这样做运作良好。

在不涉及到某个框架时，Sass把这些缓存的文件，放入到`.sass-cache`目录。该目录可使用`:cache_location`选项加以定制。而在不想要Sass采用缓存时，可将`:cache`选项设置为`false`。

## 关于Sass的各种选项

Sass有着下面这些选项。

- `:style` 设置CSS输出的样式。参见[输出样式](http://sass-lang.com/documentation/file.SASS_REFERENCE.html#output_style)。
- `:syntax` 输入文件的语法，用于缩进语法的`:sass`与CSS扩展语法的`:scss`。默认为`:scss`。
- `:property_syntax` 强制采用缩进语法的文档，使用某种属性值语法。如未使用指定的语法，就会抛出一个错误。`:new`值强制在熟悉名称后使用一个冒号。比如：`color: #0f3`或`width: $main_width`。而`:old`值则强制在属性名称之前使用一个冒号，比如`:color #0f3`或`:width $main_width`。默认两种语法都是有效的。该选项对SCSS文档没有影响。
- `:cache`, 默认为`true`。
- `:read_cache` 如该选项有设置，而`:cache`没有进行设置，则在存在Sass缓存时进行读取，而不会在不存在时写入缓存。
- `:cache_store`
以及其它选项，这里不涉及，因为后续主要是利用gulp来对Sass进行自动构建。

## 对CSS的扩展

### 嵌套规则（Nested Rules）

Sass中允许CSS规则嵌套于其它规则内部。此时内部规则仅应用到外部规则选择器内部。比如：

```scss
#main p {
  color: #00ff00;
  width: 97%;

  .redbox {
    background-color: #ff0000;
    color: #000000;
  }
}
```

将被编译为：

```css
#main p {
  color: #00ff00;
  width: 97%; }
  #main p .redbox {
    background-color: #ff0000;
    color: #000000; }
```

这样做有助于避免父选择器的重复，同时令到有着大量嵌套选择器的复杂CSS布局简单多了。比如：

```scss
#main {
  width: 97%;

  p, div {
    font-size: 2em;
    a { font-weight: bold; }
  }

  pre { font-size: 3em; }
}
```

将被编译为：

```css
#main {
  width: 97%; }
  #main p, #main div {
    font-size: 2em; }
    #main p a, #main div a {
      font-weight: bold; }
  #main pre {
    font-size: 3em; }
```

### 使用`&`来实现对父选择器的引用（Referencing Parent Selectors: `&`）

某些时候，比起默认对父选择器的使用，以其它方式使用父选择器是有用处的。比如，在鼠标经过事件（hovered over）时要有特殊样式，或者body元素有着明确类的时候（you might want to have special styles for when that selector is hovered over or for when the body element has a certain class）。那么，就可以使用`&`字符，来显式地指定父选择器应在何处插入。比如：

```scss
a {
  font-weight: bold;
  text-decoration: none;
  &:hover { text-decoration: underline; }
  body.firefox & { font-weight: normal; }
}
```

将被编译为：

```css
a {
  font-weight: bold;
  text-decoration: none; }
  a:hover {
    text-decoration: underline; }
  body.firefox a {
    font-weight: normal; }
```

`&`将在CSS中其出现的地方，以父选择器进行替换。这就意味着当有着嵌套很深的规则时，在`&`被替换之前，该父选择器将被完整保留（be resolved）。比如：

```scss
#main {
  color: black;
  a {
    font-weight: bold;
    &:hover { color: red; }
  }
}
```

将被编译为：

```css
#main {
  color: black; }
  #main a {
    font-weight: bold; }
    #main a:hover {
      color: red; }
```

`&`必须出现在某个复合选择器（a compound selector）的开头，不过其后面可以跟上一个后缀，该后缀将被添加到父选择器上。比如：

```scss
#main {
  color: black;
  &-sidebar { border: 1px solid; }
}
```

将被编译为：

```css
#main {
  color: black; }
  #main-sidebar {
    border: 1px solid; }
```    

如果该父选择器未能添加某个后缀，Sass将抛出一个错误。

### 嵌套的属性（Nested Properties）

CSS有着少数的属性，处于其所谓的“命名空间（namespaces）”;比如，`font-family`, `font-size`, 以及`font-weight`，都是位于`font`命名空间中的。在CSS中，如打算设置某个命名空间中的一群属性，就必须将其一一打出来。Sass为此提供了一条捷径：只要写一次命名空间，随后将其子属性嵌套在它的内部。比如：

```scss
.funky {
  font: {
    family: fantasy;
    size: 30em;
    weight: bold;
  }
}
```

将被编译为：

```css
.funky {
  font-family: fantasy;
  font-size: 30em;
  font-weight: bold; }
```

而该属性命名空间也可以有其自身的值。比如：

```scss
.funky {
  font: 20px/24px fantasy {
    weight: bold;
  }
}
```

将被编译为：

```css
.funky {
  font: 20px/24px fantasy;
    font-weight: bold;
}
```

### 占位符选择器`%foo`（Placeholder Selectors: `%foo`）

Sass支持一类特殊的名为“占位符选择器（placeholder selector）”的选择器。它们看起来与类及id选择器（class and id selectors）类似, 只是`#`与`.`被替换成了`%`。这类选择器是为与`@extend`指令（`@extend` directive）一起使用的; 关于占位符选择器，请移步[@extend-Only Selectors](http://sass-lang.com/documentation/file.SASS_REFERENCE.html#placeholders)

仅存在占位符选择器，而没有使用任何`@extend`指令的情况下，那些使用到占位符选择器的规则集，是不会渲染到CSS中去的。

## 关于注释：`/*``*/`及`//`

Sass支持使用`/**/`的标准CSS多行注释，以及使用`//`的单行注释。多行注释在可能的地方，保留在CSS输出中，但单行注释将被移除。比如：

```scss
/* This comment is
 * several lines long.
 * since it uses the CSS comment syntax,
 * it will appear in the CSS output. */
body { color: black; }

// These comments are only one line long each.
// They won't appear in the CSS output,
// since they use the single-line comment syntax.
a { color: green; }
```

将被编译为：

```css
/* This comment is
 * several lines long.
 * since it uses the CSS comment syntax,
 * it will appear in the CSS output. */
body {
  color: black; }

a {
  color: green; }
```

当某个多行注释的第一个字母为`!`时，就算处于压缩的输出模式下，该注释也将始终被渲染到css输出中。这在将一些版权通知加入到生成的CSS中时，是有用的。

因为多行注释成为了最终CSS的组成部分，那么其内部的插值（interpolation）就被保留下来。比如：

```scss
$version: "1.2.3";
/* This CSS is generated by My Snazzy Framework version #{$version}. */
```

将被编译为：

```css
/* This CSS is generated by My Snazzy Framework version 1.2.3. */
```

## 关于SassScript

除了这些普通的CSS属性语法，Sass还支持一套名为SassScript的扩展。SassScript允许那些属性值使用变量、加减乘除算术，以及一些额外的函数。SassScript可用在所有属性上。

SassScript还可用于生成选择器及属性名称，这在编写`mixins`时有用处。选择器及属性名称的生成，是通过插值实现的。

### Sass的交互式界面（Interactive Shell）

使用交互式shell, 就可以容易地体验到SassScript。以`-i`选项运行`sass`命令，就可以打开这个shell。在提示符处，输入任意合法的SassScript表达式，该表达式将得以执行，并打印出其输出：

```bash
$ sass -i
>> "Hello, Sassy World!"
"Hello, Sassy World!"
>> 1px + 1px + 1px
3px
>> #777 + #777
#eeeeee
>> #777 + #888
white
```

### 关于变量：`$`

使用SassScrit的最为直截了当的方式，就是使用变量了。变量以美元符号开头，并像CSS属性那样对其进行设置：

```scss
$width: 5em;
```

变量将在其被定义的嵌套选择器级别可用。而假如实在所有嵌套选择器外部定义的变量，那么这些变量将在所有地方可用。还可以使用`!global`标志来定义变量，此时这些变量也将是所有地方可用的。比如：

```scss
#main {
  $width: 5em !global;
  width: $width;
}

#sidebar {
  width: $width;
}
```

*译者注*：嵌套选择器内使用`!global`标志，会改变外部变量的值吗？答案是会改变。

```scss
$width: 90%;

#main p {   
    .redbox {
        background-color: #ff0000;
        color: #000000;
        width: $width;
    }
    
    color: #00ff00;
    $width: 97% !global;
    width: $width;   
    
    .greenbox {
        background-color: #00ff00;
        color: #000000;
        width: $width;
    }
}
```

将被编译为：

```css

#main p {
  color: #00ff00;
  width: 97%; }
  #main p .redbox {
    background-color: #ff0000;
    color: #000000;
    width: 90%; }
  #main p .greenbox {
    background-color: #00ff00;
    color: #000000;
    width: 97%; }

```

因为历史原因，变量名称（以及其它Sass标识符）中可将短横线（hyphens, `-`）与下划线（underscores, `_`）进行互换使用。比如，如你定义了一个叫做`$main-width`的变量，那么也可以`$main_width`对其进行访问，反过来也行。

### 关于Sass中的数据类型（Data Types）

SassScript支持七种主要的数据类型：

- 数字（比如`1.2`, `13`, `10px`）
- 文本的字符串，包括带引号与不带引号的（比如，`"foo"`, `'bar'`, `baz`）
- 颜色（比如，`blue`，`#04a3f9`, `rgba(255, 0, 0, 0.5)`）
- 布尔值（比如，`true`, `false`）
- 空值（比如，`null`）
- 数值的列表，以空格或都好分隔的（比如，`1.5em 1em 0 2em`, `Helvetica, Arial, sans-serif`）
- 一对一的字典（map）（比如，`(key1: value1, key2: value2)`）

SassScript也支持其他类型的CSS属性值，比如Unicode的范围以及`!important`声明。但它不具备对这些类型的处理。这些属性值类型，仅被作为未使用引号的字符串。

####关于字符串

CSS指定了两种字符串：有着引号的，比如`"Lucida Grande"`或者`'http://sass-lang.com'`，以及没有引号的，比如`sans-serif`或者`bold`。SassScript对这两种字符串都可识别，且在通常情况下，如果在Sass文件中使用了一种字符类型，那么在CSS中也将使用该种类型。

但这里有一个例外，在使用[`#{}`进行插值](http://sass-lang.com/documentation/file.SASS_REFERENCE.html#interpolation_)时，带有引号的字符串，将除去引号。这样做就使得诸如在mixins中的选择器名称的插值操作，易于使用了。比如：

```scss
@mixin firefox-message($selector) {
  body.firefox #{$selector}:before {
    content: "Hi, Firefox users!";
  }
}

@include firefox-message(".header");
```

将被编译为：

```css
body.firefox .header:before {
  content: "Hi, Firefox users!"; }
```

#### 清单（Lists）

清单是Sass用于表示诸如`margin: 10px 15px 0 0`或者`font-face: Helvetica, Arial, sans-serif`这样的CSS声明的方式。清单就是一系列由空格或逗号分隔的其它值。实际上单个数值也算作是清单的：它们只是仅有一个条目的清单。

仅有清单本身，并不能完成什么，但[SassScript的清单函数](http://sass-lang.com/documentation/Sass/Script/Functions.html#list-functions)，让其有着用处了。[函数`nth`](http://sass-lang.com/documentation/Sass/Script/Functions.html#nth-instance_method)可访问到某个清单中的条目，而[join函数](http://sass-lang.com/documentation/Sass/Script/Functions.html#join-instance_method)则可以将多个清单结合起来，同时[append函数](http://sass-lang.com/documentation/Sass/Script/Functions.html#append-instance_method)可将一些条目添加到清单上。[`@each`指令](http://sass-lang.com/documentation/file.SASS_REFERENCE.html#each-directive)还可以为清单中的各个条目添加上样式。

清单除了可以包含简单数值，还可以包含其它清单。比如`1px 2px, 5px 6px`是一个两条目清单，包含了清单`1px 2px`及清单`5px 6px`。加入内部清单使用了外部清单相同的分隔符，那么就要使用括号来令到内部清单是从何处开始及结束的。比如`(1px 2px) (5px 6px)`同样是一个两条目清单，包含了清单`1px 2px`与清单`5px 6px`。区别在于外部清单是空格分隔的，而之前则是逗号分隔的。

在清单被转化为普通CSS时，Sass并不会添加任何的括号，因为CSS无法理解括号。这就意味着`(1px 2px) (5px 6px)`及`1px 2px 5px 6px`在转变为CSS是是一样的了。但当它们作为Sass时则是不同的：第一个清单包含了两个清单，而第二个这是包含了4个数字的单个清单。

清单也可以是没有条目的。这些清单被表示为`()`（其同时也是一个空的map）。它们是不可以直接输出到CSS的; 比如在尝试`font-family: ()`时，Sass将产生一个错误。而假如某个清单包含了空白清单或空值，比如`1px 2px () 3px`或`2px null 3px`，这里的空白清单与空值，将在包含其的清单被转换到CSS时，被移除。

逗号分隔的清单，可以有着一个末尾的逗号。因为这样做允许表示一个单一元素的清单，而特别有用。比如`(1,)`，是一个包含着`1`的清单，而`(1 2 3,)`则是一个包含了一个空格分隔清单`1, 2, 3`的逗号分隔清单。

#### 字典（Maps）

字典表示键与数值之间的某种联系，这里的键用于查找数值。Maps令到将数值收集到命名的分组组，并动态地访问这些分组变得容易。尽管它们在语法上与媒体查询表达式类似，但在CSS中它们并没有直接的并排。

```scss
$map: (key1: value1, key2: value2, key3: value3);
```

与列表不同，maps必须始终有括号包围，同时必须是逗号分隔的。maps中的键与数值，都可以是任何的Sass对象。map中与给定键相关联的值仅能是一个（不过该值可以是一个清单）。但一个值可以与多个键相关联。

与清单类似，maps在大多数情况下也是使用[SassScript函数](http://sass-lang.com/documentation/Sass/Script/Functions.html#map-functions)来进行操作的。`map-get`函数在某个map中查找数值，而`map-merge`函数则将一些值加入到某个map中。[指令`@each`](http://sass-lang.com/documentation/file.SASS_REFERENCE.html#each-multi-assign)可用于往某个map中的各个键/值对加上样式。map中的键/值对顺序，始终与该map创建时保持一致。

那些可以使用清单的地方，就都可以使用maps。在被某个清单函数使用使用到时，map就被当成键/值对清单加以对待。比如，`(key1: value1, key2: value2)`将被清单函数作为嵌套清单`key1 value1, key2 value2`加以处理。但清单是不能作为maps加以对待的，因为有着空清单的例外。`()`同时表示了一个没有键/值对的map，以及没有元素的清单。

请注意map中的键可以是所有种类的Sass数据类型（甚至是另一map）, 且一个map的声明中，是允许执行任意SassScript表达式来得到键的。

Maps是不能转换到普通CSS的。使用map作为变量的值，或是作为某个CSS函数的参数，都将引发错误。可以使用`inspect($value)`函数，来生成可用于对maps进行调试的输出字串。

#### 颜色（Colors）

所有CSS颜色表达式，都将返回一个SassScript颜色数值。这包含了[大量有名称的颜色](https://github.com/nex3/sass/blob/stable/lib/sass/script/value/color.rb#L28-L180), 这些颜色名称与未加引号的字符串是没有分别的。

在压缩输出模式中，Sass将输出颜色的最短CSS表示方式。比如，`#FF0000`在压缩模式下将输出为`red`, 但`blanchedalmond`将输出为`#FFEBCD`。

与有名称颜色相关的常见问题，就是Sass优先使用手工输入的颜色模式进行输出，而不是其它输出模式，在压缩输出模式下，插入到选择器中的某种颜色，将成为无效语法。为避免这个问题，加入命名的颜色将用于某个选择器的构建，那么请一直将该命名的颜色用引号括起来。

### 关于Sass的运算（Operations）

所有变量类型都支持相等运算（`==` 及 `!=` ）。此外，每种变量类型又有着其自身所特殊支持的运算。

#### 数字运算（Number Operations）

SassScrit支持那些关于数字方面的标准算术运算（加法`+`、减法`-`、乘法`*`、除法`/`，以及求模`%`）。Sass数学函数在算术运算过程中将保留单位（preserve units）。这就是说，跟真实生活中一样，不可以对带有不相容单位的数字进行运算（比如把带有`px`和`em`两个不同单位的数字相加），同时两个有着相同单位的数字相乘，将产生平方单位（`10px * 10px == 100 px*px`）。**请注意** `px * px`并不是一个有效的CSS单位，而在CSS中使用无效单位时，Sass将给出一个错误。

对于数字，还支持关系运算符（relational operators，`<`、`>`、`<=`、`>=`），而对于所有类型变量，相等运算符（equality operators, `==`、`!=`），都是支持的。

##### 关于除法运算与`/`

CSS允许`/`出现在属性值中，作为一种分隔数值的方式。而因为SassScript是CSS属性语法的一个扩展，所以其必须支持这种方式，而又同时允许`/`用于除法运算。这就意味着在默认情况下，如果SassScript中的两个数字被`/`分开，那么它们就会以这种方式出现在CSS输出中。

不过，在下面三种情况下，`/`将被解释为除法运算。这三种方式涵盖了实际使用除法的大多数场景。它们是：

1. 在`/`两边的数值之一是存储在变量、或为函数的返回值时;
2. 在`/`两边的数值被括号括起来时，除了这些括号处于某个清单之外，而数值位处清单之内的情况;
3. 在`/`两边的数值作为另一个算术表达式的一部分使用时。

比如：

```scss
p {
  font: 10px/8px;             // Plain CSS, no division
  $width: 1000px;
  width: $width/2;            // Uses a variable, does division
  width: round(1.5)/2;        // Uses a function, does division
  height: (500px/2);          // Uses parentheses, does division
  margin-left: 5px + 8px/2px; // Uses +, does division
  font: (italic bold 10px/8px); // In a list, parentheses don't count
}
```

将被编译为：

```css
p {
  font: 10px/8px;
  width: 500px;
  height: 250px;
  margin-left: 9px; }
```

而如要与普通CSS的`/`一同使用变量，就可以使用`#{}`来将其插入。比如：

```scss
p {
  $font-size: 12px;
  $line-height: 30px;
  font: #{$font-size}/#{$line-height};
}
```

将被编译为：

```css
p {
  font: 12px/30px; }
```

##### 关于减法、负数与`-`（subtraction, Negative Numbers, and `-`）

在CSS与Sass中，有着一些差异。差异就可能是减法运算符（就像`5px - 3px`）、负数的开头（比如`-3px`）、某个一元减运算符（比如`-$var`），或是作为标识符的一部分（比如`font-weight`）。多数情况下，`-`都很清楚其用法，但存在一些棘手的情况。作为通用规则，满足下面的规则，最为安全：

- 在做减法时，请一直在`-`两边留有空格
- 做一元减运算时，要在`-`前留有空格，`-`没有空格
- 假如一元减运算位于某个清单中，请将其用括号括起来，比如`10px (-$var)`

依以下优先顺序，`-`有着不同不同的意义：

1. 某个`-`作为标识符的一部分。这就是说`a-1`是一个没有引号的字符串，其值为`"a-1"`。唯一例外就是单位了; Sass通常允许任意有效的标识符作为标识符使用，但标识符不能包含跟随一个数字的短横线（identifiers may not contain a hyphen followed by a digit）。这就意味着`5px-3px`与`5px - 3px`是相同的。
2. 某个`-`处于两个数字之间，没有逗号。这表示减法，所以`1-2`与`1 - 2`是相同的。
3. 某个`-`位处某个字面数字（a literal number）的开头。这表示一个负数，那么`1 -2`就是一个清单，包含了`1`和`-2`。
4. 某个`-`两个无关空格的数字之间（between two numbers regardless of whitespace）。这表示减法，那么`1 -$var`就与`1 - $var`相同。
5. 某个`-`在数值之前。这表示其为一元减运算符; 就是该运算符取某个数字，并返回其负值。

*译者测试代码（一元减运算符）*：

```scss
$var: -2px;

p {
    font: {
        size: -$var;
    }
}
```

将被编译为：

```css
p {
  font-size: 2px; }
```

#### 关于颜色的运算（Color Operations）

对于颜色数值，所有算术运算都是支持的，以分段进行（all arithmetic operations are supported for color values, where they work piecewise）。这就是说，运算是基于红色、绿色与蓝色部件依序执行的。比如：

```scss
p {
  color: #010203 + #040506;
}
```

将计算`01 + 04 = 05`、`02 + 05 = 07`以及`03 + 06 = 09`，而编译为：

```css
p {
  color: #050709; }
```

对于达成同样效果，通常使用那些[颜色函数](http://sass-lang.com/documentation/Sass/Script/Functions.html)更为有用, 而不是尝试颜色算术运算。

在数字与颜色之间，也可进行算术运算，这同样是分段进行的。比如：

```scss
p {
  color: #010203 * 2;
}
```

将进行`01 * 2 = 02`、`02 * 2 = 04`及`03 * 2 = 06`的计算，并为编译为：

```css
p {
  color: #020406; }
```

请注意那些带有alpha通道的颜色（使用[`rgba`](http://sass-lang.com/documentation/Sass/Script/Functions.html#rgba-instance_method)与[hsla](http://sass-lang.com/documentation/Sass/Script/Functions.html#hsla-instance_method)函数来创建出的颜色），要对这些颜色进行颜色算术运算，它们就必须要有相同的alpha值。算术运算不会对alpha值有所影响。比如：

```scss
p {
  color: rgba(255, 0, 0, 0.75) + rgba(0, 255, 0, 0.75);
}
```

将被编译为：

```css
p {
  color: rgba(255, 255, 0, 0.75); }
```

某个颜色的alpha通道，可使用[opacify](http://sass-lang.com/documentation/Sass/Script/Functions.html#opacify-instance_method)及[trasparentize](http://sass-lang.com/documentation/Sass/Script/Functions.html#transparentize-instance_method)函数进行调整。比如：

```scss
$translucent-red: rgba(255, 0, 0, 0.5);
p {
  color: opacify($translucent-red, 0.3);
  background-color: transparentize($translucent-red, 0.25);
}
```

将被编译为：

```scss
p {
  color: rgba(255, 0, 0, 0.8);
  background-color: rgba(255, 0, 0, 0.25); }
```

IE浏览器的各种滤镜，要求全部颜色都包含alpha层（the alpha layer），且要以`#AABBCCDD`这种严格的形式表示。而使用[ie_hex_str](http://sass-lang.com/documentation/Sass/Script/Functions.html#ie_hex_str-instance_method)函数，就可以容易地对颜色进行转换。比如：

```scss
$translucent-red: rgba(255, 0, 0, 0.5);
$green: #00ff00;
div {
  filter: progid:DXImageTransform.Microsoft.gradient(enabled='false', startColorstr='#{ie-hex-str($green)}', endColorstr='#{ie-hex-str($translucent-red)}');
}
```

将被编译为：

```css
div {
  filter: progid:DXImageTransform.Microsoft.gradient(enabled='false', startColorstr=#FF00FF00, endColorstr=#80FF0000);
}
```

#### 关于字符串运算（String Operations）

`+`运算可用于连接字符串：

```scss
p {
  cursor: e + -resize;
}
```

将被编译为：

```css
p {
  cursor: e-resize; }
```

请注意在将某个带引号字符串添加到不带引号字符串上时（也就是带引号字符串位处`+`的左边），结果将是一个带引号字符串。相反，如果某个不带引号字符串被添加到一个带引号字符串上时（不带引号字符串位处`+`的左边），结果将是一个不带引号字符串。比如：

```scss
p:before {
  content: "Foo " + Bar;
  font-family: sans- + "serif";
}
```

将被编译为：

```css
p:before {
  content: "Foo Bar";
  font-family: sans-serif; }
```

而默认情况下，如两个值放在一起，则它们将用一个空格连接起来：

```scss
p {
  margin: 3px + 4px auto;
}
```

将被编译为：

```css
p {
  margin: 7px auto; }
```

在文本字符串内部，`#{}`风格的插入，可用于将动态值插入到字符串中：

```scss
p:before {
  content: "I ate #{5 + 10} pies!";
}
```

将被编译为：

```css
p:before {
  content: "I ate 15 pies!"; }
```

在字符串插入操作中，空值（null values）是按照空字符串进行处理的：

```scss
$value: null;
p:before {
  content: "I ate #{$value} pies!";
}
```

将被编译为：

```css
p:before {
  content: "I ate  pies!"; }
```

#### 关于布尔运算（Boolean Operations）

SassScript支持布尔值的与（`and`）、或（`or`）及非（`not`）运算。

#### 关于清单运算（List Operations）

清单不支持所有特殊运算。但可使用[清单函数](http://sass-lang.com/documentation/Sass/Script/Functions.html#list-functions)对其进行操作。

### 关于括号（Parentheses）

括号可用于对运算的顺序施加影响：

```scss
p {
  width: 1em + (2em * 3);
}
```

将被编译为：

```css
p {
  width: 7em; }
```

## SassScript的函数（Functions）

SassScript定义了一些有用的函数，可使用一般CSS函数语法加以调用：

```scss
p {
  color: hsl(0, 100%, 50%);
}
```

将被编译为：

```css
p {
  color: #ff0000; }
```

请查看[此页面](http://sass-lang.com/documentation/Sass/Script/Functions.html)以了解这些可用的函数。

### 关键字参数（Keyword Arguments）

可以显式的关键字参数，对Sass函数进行调用。上面的例子也可写为：

```scss
p {
  color: hsl($hue: 0, $saturation: 100%, $lightness: 50%);
}
```

虽然这样做不那么简洁，但可令到样式表更为易读了。同时其也允许函数以更多灵活接口呈现，在不增加调用难度的情况下，可提供许多的参数。

命名参数（named arguments）可以任意顺序进行传递，同时带有默认值的参数可被省略。因为命名参数就是变量名称，所以下划线（`_`）与短横线（`-`）是可以互换使用的。

请参阅[Sass::Script:Functions](http://sass-lang.com/documentation/Sass/Script/Functions.html), 以了解Sass函数的完整清单及各自的参数名称，以及有关使用Ruby编程语言定义函数的教程。

### 关于插值操作（Interpolation: `#{}`）

使用了插值语法`#{}`，就也可在选择器（selectors）和属性名称中使用SassScript的变量了：

```scss
$name: foo;
$attr: border;
p.#{$name} {
  #{$attr}-color: blue;
}
```

将被编译为：

```css
p.foo {
  border-color: blue; }
```

同时，使用`#{}`将SassScript放入到属性值中也是可能的。在大多数情况下，这样做并不比使用某个变量有什么好处，但使用`#{}`后就意味着其附近的所有运算，都将以普通CSS加以对待。比如：

```scss
p {
  $font-size: 12px;
  $line-height: 30px;
  font: #{$font-size}/#{$line-height};
}
```

将被编译为：

```css
p {
  font: 12px/30px; }
```

### SassScript中的`&`

就跟在选择器中用到的那样，SassScript中的`&`是对当前父选择器的引用。它是一个逗号分隔的多个空格分隔清单的清单。比如：

```scss
.foo.bar .baz.bang, .bip.qux {
  $selector: &;
}
```

此时`$selector`的值为`((".foo.bar" ".baz.bang"), ".bip.qux")。这里引用该复合选择器，目的是表明它们是一些字符串，但在现实中，它们应是不带引号的。就算父选择器不包含逗号或空格，`&`仍将始终有着两个级别的嵌套，因此`&`可被一致性地访问到。

在没有父选择器的情况下，`&`的值将为空。这就意味着可在mixin中使用它来探测是否存在一个父选择器：

```scss
@mixin does-parent-exist {
  @if & {
    &:hover {
      color: red;
    }
  } @else {
    a {
      color: red;
    }
  }
}
```
