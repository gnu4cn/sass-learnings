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

此时`$selector`的值为`((".foo.bar" ".baz.bang"), ".bip.qux")`。这里引用该复合选择器，目的是表明它们是一些字符串，但在现实中，它们应是不带引号的。就算父选择器不包含逗号或空格，`&`仍将始终有着两个级别的嵌套，因此`&`可被一致性地访问到。

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

### 关于变量默认值：`!default`

如已在值的末尾，使用`!default`标志为某个变量进行了赋值，就不能再对该变量进行赋值操作了。这就意味着当该变量已被赋值后，就再也不会再度被赋值了，而假如其仍没有一个值，将被赋予一个。

```scss
$content: "First content";
$content: "Second content?" !default;
$new_content: "First time reference" !default;

#main {
  content: $content;
  new-content: $new_content;
}
```

将被编译为：

```css
#main {
  content: "First content";
  new-content: "First time reference"; }
```

带有`null`值的变量，是作为`!default`所为赋值的变量加以对待的：

```scss
$content: null;
$content: "Non-null content" !default;

#main {
  content: $content;
}
```

将被编译为：

```css
#main {
  content: "Non-null content"; }
```

## `@`-规则与指令（`@`-Rules and Directives）

Sass支持所有CSS3的`@`-规则，此外还支持一些Sass特定的额外规则，这些额外规则被成为“指令”。这些指令在Sass中有着不同影响，下面将对其详细说明。也请参阅[控制指令](http://sass-lang.com/documentation/file.SASS_REFERENCE.html#control_directives)与[mixin指令](http://sass-lang.com/documentation/file.SASS_REFERENCE.html#mixins)。

### `@import`指令

Sass对CSS的`@import`指令进行了扩展，以实现SCSS及Sass文件的导入。导入的所有SCSS与Sass文件，都将被合并到一个单一的CSS输出文件。此外，在所导入的文件中定义的全部变量或mixins, 都可在主文件中加以使用。

Sass将在当前目录及在Rack、Rails或Merb下的Sass文件目录，查找其他Sass文件。其它搜索目录可使用Sass的`:load_paths`选项，或者命令行的`--load-path`选项加以指定。

`@import`取得一个文件名来进行导入操作。默认其会查找一个Sass文件以直接导入，但在以下几张情况下，将编译为CSS的`@import`规则：

- 在文件扩展名是`.css`时
- 在文件名以`http://`开头时
- 文件名是一个`url()`时
- `@import`有着任意的媒体查询时

而在上述条件都不满足，且扩展名是`.scss`或`.sass`时，该命名的Sass或SCSS文件将被导入。而在没有扩展名时，Sass将尝试找到以改名字为文件名、以`.scss`或`.sass`作为扩展的文件，并加以导入。

比如：

```scss
@import "foo.scss"
```

或者

```scss
@import "foo"
```

两种写法都将把文件`foo.scss`加以导入，而下面这些

```scss
@import "foo.css";
@import "foo" screen;
@import "http://foo.com/bar";
@import url(foo);
```

则将被编译为：

```css
@import "foo.css";
@import "foo" screen;
@import "http://foo.com/bar";
@import url(foo);
```

在一个`@import`导入多个文件，也是可行的。比如：

```scss
@import "rounded-corners", "text-shadow";
```

将同时导入`rounded-corners`与`text-shadow`两个文件。

导入可包含`#{}`插值操作，但有着一些限制。基于某个变量来动态地导入某个Sass文件，就是不可行的; 所以插值操作仅适用于CSS的导入。那么插值操作就只能与`url()`的导入一起使用了。比如：

```scss
$family: unquote("Droid+Sans");
@import url("http://fonts.googleapis.com/css?family=#{$family}");
```
将被编译为：

```css
@import url("http://fonts.googleapis.com/css?family=Droid+Sans");
```

### 模板（Partials）

在打算导入某个既有的SCSS或Sass文件，而不想将其编译到某个CSS文件中时，可在该文件的文件名前加上一个下划线。这样做就告诉Sass不要将该文件编译到某个一般CSS文件中。此时可将这些文件以不带下划线的形式，加以导入。

比如，可能有一个`_colors.scss`文件。但并不会创建出`_colors.css`文件，同时可以这样做：

```scss
@import "colors";
```

那么`_colors.scss`文件将被导入。

请注意在相同目录下，是不可以同时包含有同样文件名的模板与非模板的。比如`_colors.scss`就不可与`colors.scss`同时存在于同一个目录中。

### 嵌套的`@import`（nested `@import`）

尽管大多数时候在Sass文档文档顶部有着多个`@imports`就很有用了，但在CSS规则及`@media`规则中进行导入也是可行的。与基本的`@import`一样，这样做仍将包含进所`@imported`文件的内容。但所导入的规则，将被嵌套在最初`@import`的同样位置。

比如文件`example.scss`包含以下内容：

```scss
.example {
    color: red;
}
```

随后：

```scss
#main {
    @import "example";
}
```

则将被编译为：

```css
#main .example {
    color: red;
}
```

对于诸如`@mixin`及`@charset`等，只允许在文档的基础级别出现（directives that ）的指令，是不允许在嵌套环境中所导入的文件中的。

在mixins指令或控制指令里，都是不可能嵌套`@import`的。

### `@media`指令

Sass中的`@media`指令与普通CSS中的表现类似，除了有一项额外能力：它们可被嵌套在CSS规则中。在某个`@media`指令出现在某条CSS规则中时，其就会冒到样式表的顶级层面，而将路径上的所有选择器，放入到该规则。这样就令到一些媒体相关样式的添加变得容易起来，无须重复选择器，或是破坏样式表流（This makes it easy to add media-specific styles without having to repeat selectors or break the flow of the stylesheet）。比如:

```scss
.sidebar {
  width: 300px;
  @media screen and (orientation: landscape) {
    width: 500px;
  }
}
```

将被编译为：

```css
.sidebar {
  width: 300px; }
  @media screen and (orientation: landscape) {
    .sidebar {
      width: 500px; } }
```

同样，`@media`查询也可嵌套在另一媒体查询中。这些查询将使用`and`运算符结合起来。比如：

```scss
@media screen {
  .sidebar {
    @media (orientation: landscape) {
      width: 500px;
    }
  }
}
```

将被编译为：

```css
@media screen and (orientation: landscape) {
  .sidebar {
    width: 500px; } }
```

最后要说的是，`@media`查询可以在名称及特性值等处，包含SassScript表达式（包括变量、函数及运算符）。比如：

```scss
$media: screen;
$feature: -webkit-min-device-pixel-ratio;
$value: 1.5;

@media #{$media} and ($feature: $value) {
  .sidebar {
    width: 500px;
  }
}
```

将被编译为：

```css
@media screen and (-webkit-min-device-pixel-ratio: 1.5) {
  .sidebar {
    width: 500px; } }
```

### `@extend`指令

通常有着这样的情形，那就是在设计某个页面是，一个类有着另一个类的所有样式，同时其还有着一些自身的样式。处理此种情形的最常见做法，就是在HTML中同时使用更通用的类和较特定的类。比如，假设我们有着一个用于一般错误及严重错误的设计。我们可能会这样编写标签：

```html
<div class="error seriousError">
  Oh no! You've been hacked!
</div>
```

同时有着下面的样式：

```css
.error {
  border: 1px #f00;
  background-color: #fdd;
}
.seriousError {
  border-width: 3px;
}
```

然而不幸的是，这样做就意味着我们必须始终记住要将`.error`与`.seriousError`一起使用。这是一种维护的负担，从而导致棘手的问题，同时还在HTML标记中引入了非语义的样式担忧。

`@extend`指令通过告诉Sass一个选择器应继承另一选择器的样式，而避免了这些问题。比如：

```scss
.error {
  border: 1px #f00;
  background-color: #fdd;
}
.seriousError {
  @extend .error;
  border-width: 3px;
}
```

将被编译为：

```css
.error, .seriousError {
  border: 1px #f00;
  background-color: #fdd;
}

.seriousError {
  border-width: 3px;
}
```

这就意味着所有定义给`.error`的样式，同样应用到了`.seriousError`上，此外还有着`.seriousError`所特有的样式。实际上，带有类`.seriousError`的各个元素，也有着类`.error`。

其他使用了`.error`的规则，在`.seriousError`上也会生效。比如，在有着由hackers所引发的错误样式：

```scss
.error.intrusion {
  background-image: url("/image/hacked.png");
}
```
那么`<div class="seriousError intrusion">`标签，将同样有着背景`hacked.png`。

#### `@extend`原理

`@extend`是通过将所扩展的选择器（也就是这里的`.seriousError`），插入到样式表中被扩展选择器（也就是这里的`.error`）出现的任意位置，来工作的。因此上面的示例：

```scss
.error {
  border: 1px #f00;
  background-color: #fdd;
}
.error.intrusion {
  background-image: url("/image/hacked.png");
}
.seriousError {
  @extend .error;
  border-width: 3px;
}
```

就被编译为：

```css
.error, .seriousError {
  border: 1px #f00;
  background-color: #fdd; }

.error.intrusion, .seriousError.intrusion {
  background-image: url("/image/hacked.png"); }

.seriousError {
  border-width: 3px; }
```

在合并选择器时，`@extend`足够聪明，可以避免不必要的重复，因此像是`.seriousError.seriousError`这样的选择器，就被翻译为了`.seriousError`。此外，它是不会产生出那些无法匹配任何东西的选择器的，比如`#main#footer`。

#### 对复杂选择器的扩展（Extending Complex Selectors）

可被扩展的选择器，并非类一种。任何仅涉及单一元素的选择器，都可被扩展，比如`.special.cool`、`a:hover`，或者`a.user[href^="http://"]`等。比如：

```scss
.hoverlink {
  @extend a:hover;
}
```

与类一样，这就意味着所有定义给`a:hover`的样式，都将被应用到`.hoverlink`。比如：

```scss
.hoverlink {
  @extend a:hover;
}
a:hover {
  text-decoration: underline;
}
```

将被编译为：

```css
a:hover, .hoverlink {
  text-decoration: underline; }
```

而与上面的`.error.intrusion`一样，所有使用到`a:hover`的规则，同样会在`.hoverlink`上生效，就算这些规则有着其它选择器。比如：

```scss
.hoverlink {
  @extend a:hover;
}
.comment a.user:hover {
  font-weight: bold;
}
```

将被编译为：

```css
.comment a.user:hover, .comment .user.hoverlink {
  font-weight: bold; }
```

### 多个扩展（Multiple Extends）

单个选择器，可对多个选择器进行扩展。这就意味着该选择器将继承所有被扩展选择器的样式。比如：

```scss
.error {
  border: 1px #f00;
  background-color: #fdd;
}
.attention {
  font-size: 3em;
  background-color: #ff0;
}
.seriousError {
  @extend .error;
  @extend .attention;
  border-width: 3px;
}
```

将被编译为：

```css
.error, .seriousError {
  border: 1px #f00;
  background-color: #fdd; }

.attention, .seriousError {
  font-size: 3em;
  background-color: #ff0; }

.seriousError {
  border-width: 3px; }
```

实际上，每个带有`.seriousError`类的元素，同样有着类`.error` *与*类`.attention`。因此，文档后面所定义的样式，将采取以下的优先级：`.seriousError`有着背景颜色`#ff0`，而不是`#fdd`，因为`.attention`的定义，晚于`.error`。

多项扩展的编写，还可使用逗号分隔的选择器清单形式。比如`@extend .error, .attention`，这与`@extend .error; @extend .attention;`是一样的。

#### 链接的扩展（Chaining Extends）

一个选择器对另一选择器进行扩展，而另一选择器有扩展了其它选择器，这样做是可能的。比如：

```scss
.error {
  border: 1px #f00;
  background-color: #fdd;
}
.seriousError {
  @extend .error;
  border-width: 3px;
}
.criticalError {
  @extend .seriousError;
  position: fixed;
  top: 10%;
  bottom: 10%;
  left: 10%;
  right: 10%;
}
```

现在带有类`.seriousError`的所有标记，都有着类`.error`，同时所有带有类`.criticalError`的所有标签，都有着类`.seriousError`与类`.error`了。其将被编译为：

```css
.error, .seriousError, .criticalError {
  border: 1px #f00;
  background-color: #fdd; }

.seriousError, .criticalError {
  border-width: 3px; }

.criticalError {
  position: fixed;
  top: 10%;
  bottom: 10%;
  left: 10%;
  right: 10%; }
```

#### 选择器序列（Selector Sequences）

那些选择器序列，比如`.foo .bar`或者`.foo + .bar`，当前还无法被扩展。但对于那些被嵌套的选择器自身，使用`@extend`指令也是可能的。比如：

```scss
#fake-links .link {
  @extend a;
}

a {
  color: blue;
  &:hover {
    text-decoration: underline;
  }
}
```

将被编译为：

```css
a, #fake-links .link {
  color: blue; }
  a:hover, #fake-links .link:hover {
    text-decoration: underline; }
```

##### 合并选择器序列（Merging Selector Sequences）

某个选择器序列对另一位处其它序列的选择器进行扩展，这时有发生。此时，两个序列需要被合并起来。比如：

```scss
#admin .tabbar a {
  font-weight: bold;
}
#demo .overview .fakelink {
  @extend a;
}
```

这里尽管在技术上要生成所有可能匹配到两个序列的所有选择器是可行的，但这样做将导致样式表过大。就上面的这个简单示例来说，就需要10个的选择器。取而代之的是，Sass将仅生成那些看起来有用的选择器。

在没有相同选择器的两个序列被合并时，将生成这两个心的选择器：一个是头一个序列在第二个之前的，一个是第二个序列在头一个之前的。比如：

```scss
#admin .tabbar a {
  font-weight: bold;
}
#demo .overview .fakelink {
  @extend a;
}
```

将被编译为：

```css
#admin .tabbar a,
#admin .tabbar #demo .overview .fakelink,
#demo .overview #admin .tabbar .fakelink {
  font-weight: bold; }
```
而如果两个序列有着某些相同的选择器，那么邪恶这些相同的选择器将被合并掉，而仅有不同的（在存在不同选择器的情况下）会被调换位置。在本示例中，两个序列都包含了id`#admin`, 因此最终选择器将合并这两个ids:

```scss
#admin .tabbar a {
  font-weight: bold;
}
#admin .overview .fakelink {
  @extend a;
}
```

将被编译为：

```css
#admin .tabbar a,
#admin .tabbar .overview .fakelink,
#admin .overview .tabbar .fakelink {
  font-weight: bold; }
```

#### `@extend`-Only 选择器

某些时候会打算编写一些只用于被扩展，而不会直接在HTML中使用的样式。这样做在编写一个Sass库，那里会将一些样式提供给用户来在需要时`@extend`，不需要时可以忽略的时候，就特别有用。

如以通常的类来编写，就会在生成样式表时，导致大量额外的CSS，还会造成与其它正在HTML中使用着的类发生冲突的风险。这就是Sass支持“占位符选择器”特性的原因（比如`%foo`）。

占位符选择器看起来就像是类及id选择器，只是`#`或`.`被`%`取代了。在所有可以使用类及id的地方，都可以使用占位符选择器，同时它们自身将阻止规则被渲染到CSS。比如：

```scss
// This ruleset won't be rendered on its own.
#context a%extreme {
  color: blue;
  font-weight: bold;
  font-size: 2em;
}
```

但是，与类和ids选择器一样，占位符选择器是可以被扩展的。那些被扩展的选择器将被生成，但基本占位符选择器则不会。比如：

```scss
.notice {
  @extend %extreme;
}
```

将被编译为：

```css
#context a.notice {
  color: blue;
  font-weight: bold;
  font-size: 2em; }
```

#### `!optional` 标记

通常在扩展某个选择器时，如有错误发生，那么`@extend`就不会生效。比如，在编写了一个`a.important {@extend .notice}`时，如没有选择器包含有`.notice`，就会出现错误。同时如果仅有的包含了`.notice`的选择器为`h1.notice`时，也将出现错误，因为`h1`是与`a`冲突的，且因此不会生成新的选择器。

因此一些时候，想要某个`@extend`并不产生任何的新选择器。要实现这个目的，秩序将`!optional`标志，添加在该选择器后面。比如：

```scss
a.important {
  @extend .notice !optional;
}
```

#### 指令中的`@extend`

在诸如`@media`等的指令中，`@extend`的使用有着一些限制。通过到处复制样式，Sass是无法在不建立庞大样式表的情况下，实现将`@media`代码块外部的CSS规则，应用到其内部的选择器上的。这就意味着要在`@media`内部使用`@extend`（或别的CSS指令）的话，只能对出现在同样指令代码块内部的那些选择器进行扩展。

比如，下面的代码可以工作：

```scss
@media print {
  .error {
    border: 1px #f00;
    background-color: #fdd;
  }
  .seriousError {
    @extend .error;
    border-width: 3px;
  }
}
```

不过下面这个就是错误的：

```scss

.error {
  border: 1px #f00;
  background-color: #fdd;
}

@media print {
  .seriousError {
    // INVALID EXTEND: .error is used outside of the "@media print" directive
    @extend .error;
    border-width: 3px;
  }
}
```

我们希望未来浏览器能够原生支持`@extend`指令，那样允许其在`@media`及其它指令内部可以使用。

### `@at-root`指令

`@at-root`指令将引发一条或多条规则在文档根处得以生成，而不是嵌套在其父选择器之下。它既可以与某个单一的行内选择器使用：

```scss
.parent {
  ...
  @at-root .child { ... }
}
```

将被编译为：

```css
.parent { ... }
.child { ... }
```

也可以将其与一个包含了多个选择器的代码块一起使用：

```scss
.parent {
  ...
  @at-root {
    .child1 { ... }
    .child2 { ... }
  }
  .step-child { ... }
}
```

将被编译为：

```css
.parent { ... }
.child1 { ... }
.child2 { ... }
.parent .step-child { ... }
```

##### `@at-root (without: ...)`以及`@at-root (with: ...)`

默认情况下，`@at-root`只会排除选择器。但使用`@at-root`来将嵌套的诸如`@media`这样的指令，迁移到外部，也是可能的。比如：

```scss
@media print {
  .page {
    width: 8in;
    @at-root (without: media) {
      color: red;
    }
  }
}
```

将被编译为：

```css
@media print {
  .page {
    width: 8in;
  }
}
.page {
  color: red;
}
```

那么就可以使用`@at-root (without: ...)`，类从任何指令进行迁移到外部。也可以与由空格分隔的多条指令一起使用：`@at-root (without: media supports)`， 而同时从`@media`及`@supports`查询同时移到外部。

可将两个特殊值传递给`@at-root`指令。`rule`是指一般CSS规则; `@at-root (without: rule)` 与没有查询的`@at-root`相同。而`@at-root (without: all)`的意思就是这些样式将从*所有*指令和CSS规则从迁移到外部。

而在想要指定哪些指令或规则要包含进去，而不是列出那些将要排除时，就要使用`with`来替代`without`了。比如`@at-root (with: rule)`将从所有指令移至外部，但仍将保留所有CSS样式。

### `@debug`指令

`@debug`指令会将某个SassScript表达式的值，打印到标准错误输出流。该指令对于调试那些有着复杂SassScript的Sass文件是有用的。比如：

```scss
@debug 10em + 12em;
```

的输出为：

```bash
Line 1 DEBUG: 22em
```

### `@warn`指令

`@warn`指令将某个SassScript表达式的值打印到错误输出流。对于那些需要向用户给出用法或从小的mixin用法错误恢复的警告信息的库来说，是有用的。`@warn`与`@debug`的主要区别在于：

1. 可使用命令行选项`--quiet`，或Sass的选项`:quiet`，来关闭警告信息。
2. 与警告消息一道，将打印出一条样式表的追踪信息（a stylesheet trace），因此被警告的用户可以看到他们的样式在何处造成了警告。

用例：

```scss
@mixin adjust-location($x, $y) {
  @if unitless($x) {
    @warn "Assuming #{$x} to be in pixels";
    $x: 1px * $x;
  }
  @if unitless($y) {
    @warn "Assuming #{$y} to be in pixels";
    $y: 1px * $y;
  }
  position: relative; left: $x; top: $y;
}
```

### `@error`指令

`@error`指令将某个SassScript表达式的值，作为致命错误，并包含一个良好形式的栈追踪信息，加以抛出。对于验证mixins与函数的参数，其是有用的。比如：

```scss
@mixin adjust-location($x, $y) {
  @if unitless($x) {
    @error "$x may not be unitless, was #{$x}.";
  }
  @if unitless($y) {
    @error "$y may not be unitless, was #{$y}.";
  }
  position: relative; left: $x; top: $y;
}
```

当前尚无捕获错误的方式。

## 控制指令与表达式（Control Directives & Expressions）

SassScript支持一些基本的控制指令及表达式，用于在满足某些条件下样式的包含，或者多次包含带有变化的相同样式。

**注意**：控制指令是一类高级特性，且在日常样式设计中并不常用。控制指令存在的主要用途实在mixins中，特别是那些作为像是[Compass](http://compass-style.org/)的库的组成部分的mixins中，因此它们要求实质上的灵活性。

### `if()`

该内建的`if()`函数，允许按照某个条件转移，而返回两个可能结果之一。其可用在任意的脚本上下文中。`if`函数仅执行其将返回的那个参数 -- 这就允许引用到那些可能没有被定义的变量，或者可能导致错误的运算（比如除以零）。

```scss
if(true, 1px, 2px) => 1px
if(false, 1px, 2px) => 2px
```

### `@if`

`@if`指令将取一个SassScript表达式，并在表达式返回除开`false`或`null`时，使用嵌套在表达式下的那些样式：

```scss
p {
  @if 1 + 1 == 2 { border: 1px solid;  }
  @if 5 < 3      { border: 2px dotted; }
  @if null       { border: 3px double; }
}
```

将被编译为：

```css
p {
  border: 1px solid; }
```

`@if`语句之后可跟随多个的`@else if`语句，及一个`@else`语句。在`@if`语句失效是，将依序尝试`@else if`语句，直到某个成功，或者到达`@else`。比如：

```scss
$type: monster;
p {
  @if $type == ocean {
    color: blue;
  } @else if $type == matador {
    color: red;
  } @else if $type == monster {
    color: green;
  } @else {
    color: black;
  }
}
```

将被编译为：

```css
p {
  color: green; }
```

### `@for`

`@for`指令将重复输出一套的样式。对于每次重复，将用到一个计数器变量，来调整输出。该指令有着两个形式：`@for $var from <start> through <end>` 及 `@for $var from <start> to <end>`。注意关键字`through`与`to`的区别。`$var`可以是任何变量名称，像是`$i`; 而`<start>`与`<end>`则是应返回整数值的SassScript表达式。在`<start>`大于`<end>`时，计数器将减小，而非增大。

`@for`语句将设置`$var`为该指定范围的各个连续数字，同时每次将使用`$var`的值来输出所嵌套的那些样式。对于`from ... through`这种形式，该范围*包含*了`<start>`与`<end>`两个值，而对于`from ... to`形式，就不包含`<end>`数值。下面是使用`<through>`的情形：

```scss
@for $i from 1 through 3 {
  .item-#{$i} { width: 2em * $i; }
}
```

将被编译为：

```css
.item-1 {
  width: 2em; }
.item-2 {
  width: 4em; }
.item-3 {
  width: 6em; }
```

### `@each`

`@each`指令通常有着`@each $var in <list or map>`这种形式。`$var` 可以是任何的变量名称，比如`$length`或者`$name`， 同时`<list or map>`则是一个将返回清单或map的SassScript表达式。

`@each`指令将`$var`设置为那个清单或map中的各个条目，随后使用`$var`的值来输出其所包含的那些样式。比如：

```scss
@each $animal in puma, sea-slug, egret, salamander {
  .#{$animal}-icon {
    background-image: url('/images/#{$animal}.png');
  }
}
```

将被编译为：

```css
.puma-icon {
  background-image: url('/images/puma.png'); }
.sea-slug-icon {
  background-image: url('/images/sea-slug.png'); }
.egret-icon {
  background-image: url('/images/egret.png'); }
.salamander-icon {
  background-image: url('/images/salamander.png'); }
```

#### 多项赋值（Multiple Assignment）

`@each`指令还可以使用多个变量，比如在`@each $var1, $var2, ... in <list>`中。在`<list>`是一个清单的清单时，子清单中的各个元素，就被赋给相应的变量。比如：

```scss
@each $animal, $color, $cursor in (puma, black, default),
                                  (sea-slug, blue, pointer),
                                  (egret, white, move) {
  .#{$animal}-icon {
    background-image: url('/images/#{$animal}.png');
    border: 2px solid $color;
    cursor: $cursor;
  }
}
```

将被编译为：

```css
.puma-icon {
  background-image: url('/images/puma.png');
  border: 2px solid black;
  cursor: default; }
.sea-slug-icon {
  background-image: url('/images/sea-slug.png');
  border: 2px solid blue;
  cursor: pointer; }
.egret-icon {
  background-image: url('/images/egret.png');
  border: 2px solid white;
  cursor: move; }
```

而因为map是被作为键值对加以对待的，所以多项赋值对它们也是可用的。比如：

```scss
@each $header, $size in (h1: 2em, h2: 1.5em, h3: 1.2em) {
  #{$header} {
    font-size: $size;
  }
}
```

将被编译为：

```css
h1 {
  font-size: 2em; }
h2 {
  font-size: 1.5em; }
h3 {
  font-size: 1.2em; }
```

### `@while`指令

`@while`指令将取一个SassScript表达式，并在该语句执行到`false`之前，重复地输出所嵌套的那些样式。此指令可用于实现比起`@for`语句所能完成的更为复杂的循环，尽管复杂循环在极少数情况下是必需的。比如：

```scss
$i: 6;
@while $i > 0 {
  .item-#{$i} { width: 2em * $i; }
  $i: $i - 2;
}
```

将被编译为：

```css
.item-6 {
  width: 12em; }

.item-4 {
  width: 8em; }

.item-2 {
  width: 4em; }
```

## Mixin 指令

Sass的mixin特性，允许在无需求助于像是`.float-left`这样的非语义类的情况下，就可以定义出一些可在整个样式表中重用的样式。这些mixins中同样可以包含完整的CSS规则，以及所有可以出现在某个Sass文档中的其它任何内容。它们甚至可以带有参数，从而允许在使用少数几个mixins的情况下，就可以产生出丰富的样式。

### 使用`@mixin`来定义一个mixin

使用`@mixin`指令，就可以定义mixins。指令后跟随的是要定义mixin的名称，以及可选的[参数](http://sass-lang.com/documentation/file.SASS_REFERENCE.html#mixin-arguments), 还有就是包含了该mixin内容的代码块。比如，`large-text`这个mixin的定义：

```scss
@mixin large-text {
  font: {
    family: Arial;
    size: 20px;
    weight: bold;
  }
  color: #ff0000;
}
```

在mixin中也可以包含选择器，一般是与一些属性混合在一起。甚至这些选择器还可以包含[父参考](http://sass-lang.com/documentation/file.SASS_REFERENCE.html#referencing_parent_selectors_)。比如：

```scss
@mixin clearfix {
  display: inline-block;
  &:after {
    content: ".";
    display: block;
    height: 0;
    clear: both;
    visibility: hidden;
  }
  * html & { height: 1px }
}
```

因为历史原因，mixin的名称（以及所有其它Sass标识符）可以将下划线与短横线互换使用。比如，在定义了一个名为`add-column`的mixin后，可以`add_column`将其加以包含，相反也行。

### 使用`@include`来包含一个mixin

在Sass文档中，是通过使用`@include`指令来包含这些mixins的。该指令将取某个mixin的名称，并将[一些可选的参数传递给该mixin](http://sass-lang.com/documentation/file.SASS_REFERENCE.html#mixin-arguments), 进而将那个mixin中所定义的一些规则，包含到当前规则中。比如：

```scss
.page-title {
  @include large-text;
  padding: 4px;
  margin-top: 10px;
}
```

将被编译为：

```css
.page-title {
  font-family: Arial;
  font-size: 20px;
  font-weight: bold;
  color: #ff0000;
  padding: 4px;
  margin-top: 10px; }
```

在mixins没有直接定义出任何熟悉，或使用到任何的父引用时，也可在所有规则之外对其进行包含（也就是在文档的根处）。比如：

```scss
@mixin silly-links {
  a {
    color: blue;
    background-color: red;
  }
}

@include silly-links;
```

将被编译为：

```css
a {
  color: blue;
  background-color: red; }
```

还可以在mixin的定义中，包含其它mixins。比如：

```scss
@mixin compound {
  @include highlighted-background;
  @include header-text;
}

@mixin highlighted-background { background-color: #fc0; }
@mixin header-text { font-size: 20px; }
```

甚至mixins还可以包含本身。这在早于3.3版本的Sass中有所不同，早于3.3的版本中，mixin的递归是禁止的。

那些只定义了后代选择器的mixins，可在文档的最顶级安全地加以混合（Mixins that only define descendent selectors can be safely mixed into the top most level of a document）。

### 关于mixins的参数

可将SassScript的变量作为mixins的参数，这些参数是在mixin被包含的的时候提供，并在mixin被包含时给出，从而在mixin内部作为变量可用。

在定义某个mixin时，参数是作为由逗号分隔的变量名称编写，放入到位于mixin名称后面的括号里。随后在包含该mixin时，便可一同样方式将一些值加以传入。比如：

```scss
@mixin sexy-border($color, $width) {
  border: {
    color: $color;
    width: $width;
    style: dashed;
  }
}

p { @include sexy-border(blue, 1in); }
```

将被编译为：

```css
p {
  border-color: blue;
  border-width: 1in;
  border-style: dashed; }
```

使用一般变量设置语法，还可以为mixins指定它们参数的默认值。那么在该mixin被包含时，如没有传入那个参数，则将使用默认值。比如：

```scss
@mixin sexy-border($color, $width: 1in) {
  border: {
    color: $color;
    width: $width;
    style: dashed;
  }
}
p { @include sexy-border(blue); }
h1 { @include sexy-border(blue, 2in); }
```

将被编译为：

```css
p {
  border-color: blue;
  border-width: 1in;
  border-style: dashed; }

h1 {
  border-color: blue;
  border-width: 2in;
  border-style: dashed; }
```

#### 关键字参数（Keyword Arguments）

可使用显式的关键字参数，来包含mixins。比如，上面的示例可写作：

```scss
p { @include sexy-border($color: blue); }
h1 { @include sexy-border($color: blue, $width: 2in); }
```

虽然这样做不那么简洁，但其可令到样式表更为易读。这样做还领导函数呈现出更为灵活的接口，在提供许多参数的情况下，调用起来也不困难。

命名的参数可以任意顺序加以传入，同时有默认值的参数可被省略。因为命名参数就是变量名称，所以下划线与短横线可以交换使用。

#### 可变参数（Variable Arguments）

某些时候，对某个mixin或函数，取未知数目的参数是有意义的。比如，一个用于创建方框阴影的mixin，就可能取任意数量的阴影作为参数。对于这些情形，Sass对“可变参数”具有支持，此特性就是在某个mixin或函数声明的末尾的参数，取得所有剩下的参数并将其打包为一个清单。这些参数与一般参数看起来并无二致，其后跟随了一个`...`。比如：

```scss
@mixin box-shadow($shadows...) {
  -moz-box-shadow: $shadows;
  -webkit-box-shadow: $shadows;
  box-shadow: $shadows;
}

.shadows {
  @include box-shadow(0px 4px 5px #666, 2px 6px 10px #999);
}
```

将被编译为：

```css
.shadows {
  -moz-box-shadow: 0px 4px 5px #666, 2px 6px 10px #999;
  -webkit-box-shadow: 0px 4px 5px #666, 2px 6px 10px #999;
  box-shadow: 0px 4px 5px #666, 2px 6px 10px #999;
}
```

可变参数也包含任意传递给mixin或函数的关键字参数（variable arguments also contain any keyword arguments passed to the mixin or function）。这些关键字参数可使用[`keywords(args)`函数](http://sass-lang.com/documentation/Sass/Script/Functions.html#keywords-instance_method)访问到，该函数将以字符串（不带`$`）到值的map形式返回这些关键字参数。

可变参数同样可在调用某个mixin时加以使用。可使用同样语法，将某个值的清单进行扩展，以致每个值都作为单独参数得以传递，或是将某个值的map加以扩展，从而map中的每个键值对，都作为一个关键字参数。比如：

```scss
@mixin colors($text, $background, $border) {
  color: $text;
  background-color: $background;
  border-color: $border;
}

$values: #ff0000, #00ff00, #0000ff;
.primary {
  @include colors($values...);
}

$value-map: (text: #00ff00, background: #0000ff, border: #ff0000);
.secondary {
  @include colors($value-map...);
}
```

将被编译为：

```css
.primary {
  color: #ff0000;
  background-color: #00ff00;
  border-color: #0000ff;
}

.secondary {
  color: #00ff00;
  background-color: #0000ff;
  border-color: #ff0000;
}
```

只要将清单放在map前面，就可以同时传递一个参数清单和map，就像`@include colors($values..., $map...)`。

可使用可变参数来对某个mixin进行封装，而在不改变该mixin参数署名（the argument signature）的情况下，加入额外样式。如进行了封装，那么那些关键字参数将直接传递给被封装的mixin。比如：

```scss
@mixin wrapped-stylish-mixin($args...) {
  font-weight: bold;
  @include stylish-mixin($args...);
}

.stylish {
  // The $width argument will get passed on to "stylish-mixin" as a keyword
  @include wrapped-stylish-mixin(#00ff00, $width: 100px);
}
```

### 将内容块传递给某个mixin(Passing Content Blocks to a Mixin)

将某个一些样式的块，传递给mixin，而放置在该mixin的一些样式内部，是可能的。传入的这些样式，将出现在该mixin中所发现的任何`@content`指令处。此特性令到定义一些与选择器及指令的构造相关的抽象变得可能。

比如：

```scss
@mixin apply-to-ie6-only {
  * html {
    @content;
  }
}
@include apply-to-ie6-only {
  #logo {
    background-image: url(/logo.gif);
  }
}
```

将生成：

```css
* html #logo {
  background-image: url(/logo.gif);
}
```

以`.sass`速记语法，可以这些编写这些mixins:

```scss
=apply-to-ie6-only
  * html
    @content

+apply-to-ie6-only
  #logo
    background-image: url(/logo.gif)
```

**注意**：当`@content`指令被多次指定，或在某个循环中指定时，每次调用都将导致样式块被复制。

#### 变量作用域与内容块（Variable Scope and Content Blocks）

传递给某个mixin的内容块，是在该块被定义的地方被执行的，而不是在该mixin中。这就意味着mixin本地的变量，无法在所传入的样式块中进行使用，且这些变量将保留为全局值（this means that variables local to the mixin cannot be used within the passed style block and variables will resolve to the global value）:

```scss
$color: white;
@mixin colors($color: blue) {
  background-color: $color;
  @content;
  border-color: $color;
}
.colors {
  @include colors { color: $color; }
}
```
将被编译为：

```css
.colors {
  background-color: blue;
  color: white;
  border-color: blue;
}
```

此外，这也表明所传入的样式块中使用到的变量及mixins，与其它该块被定义处周围的其它样式, 是有联系的（addtionally, this makes it clear that the variables and mixins that are used within the passed block are related to the other styles around where the block is defined）。比如：

```scss
#sidebar {
  $sidebar-width: 300px;
  width: $sidebar-width;
  @include smartphone {
    width: $sidebar-width / 3;
  }
}
```

## 函数指令（Function Directives）

在Sass中定义自己的函数，并在任何值或脚本上下文加以使用，是可能的。比如：

```scss
$grid-width: 40px;
$gutter-width: 10px;

@function grid-width($n) {
  @return $n * $grid-width + ($n - 1) * $gutter-width;
}

#sidebar { width: grid-width(5); }
```

将变为：

```css
#sidebar {
  width: 240px; }
```

可以看到，就像一个mixin那样，函数可对任何的全局定义变量（any globally defined variables）进行访问，同时接受参数。函数在其内部可有着多条语句，且必须调用`@return`来设置该函数的返回值。

与mixins一样，可使用关键字参数来调用那些Sass定义的函数。在上面的示例中，可以像这样来调用该函数：

```scss
#sidebar { width: grid-width($n: 5); }
```

为避免命名上的冲突，建议在自己定义函数前加上前缀，这样做之后，那些阅读样式表的人这些函数不是Sass或CSS的一部分。比如，如你在为ACME集团公司做事，就可以将上面的函数取名为`-acme-grid-width`。

用户定义函数也支持以mixins中同样方式的可变参数。

因为历史原因，函数名称（及所有其它Sass标识符）都可将下划线及短横线互换使用。比如，在定义某个名为`grid-width`的函数后，可作为`grid_width`使用，反之亦然。

## 输出风格（Output Style）

尽管Sass输出的默认CSS风格极为美观，且可反应文档的结构，但由于口味及需求不同，所以Sass还是支持几种其它输出风格。

通过设置[`:style`选项](http://sass-lang.com/documentation/file.SASS_REFERENCE.html#style-option), 或使用`--style`命令行标志，Sass允许在4中不同风格之间加以选择。

### `:nested`风格

嵌套风格是Sass的默认风格，因为其反应了CSS样式及这些样式要赋予到HTML文档的结构。每个属性都占据一行，但缩进量是不同的。各条规则的缩进，是由其嵌套深度决定的。比如：

```css
#main {
  color: #fff;
  background-color: #000; }
  #main p {
    width: 10em; }

.huge {
  font-size: 10em;
  font-weight: bold;
  text-decoration: underline; }
```

在查看大型CSS文件时，嵌套风格极为有用：允许在无需切实阅读任何内容的情况下，就可以轻易地掌握文件结构。

### `:expanded`风格

展开风格（expanded）是一种更典型的手工编写CSS风格，这种风格下每个属性及规则都占据一行。规则内部的那些属性都有缩进，但规则并没有特别方式的缩进。比如：

```scss
#main {
  color: #fff;
  background-color: #000;
}
#main p {
  width: 10em;
}

.huge {
  font-size: 10em;
  font-weight: bold;
  text-decoration: underline;
}
```

### `:compact`风格

比起嵌套与展开风格，紧凑风格占据更少的空间。该风格同样着重于选择器，而不是属性。每条CSS规则占据一行，那一行上定义了所有该规则的属性。嵌套规则是放在各自旁边，而不会占据新行，而单独的规则组别，则有着各自的新行。比如：

```scss
#main { color: #fff; background-color: #000; }
#main p { width: 10em; }

.huge { font-size: 10em; font-weight: bold; text-decoration: underline; }
```

### `:compressed`

压缩风格占据尽可少的空间，除了一些必要的用于分隔选择器的空格外，是没有空格的，同时在文件末尾是没有新行的。该风格还有着一些其它较小的压缩，比如选择颜色的最小表示法。此风格不是人类可以读取的。比如：

```css
#main{color:#fff;background-color:#000}#main p{width:10em}.huge{font-size:10em;font-weight:bold;text-decoration:underline}
```

## 对Sass的扩展

Sass对那些有着特别需求的用户，提供了一些高级定制的特性。要使用到这些特性，需要对Ruby编程语言有着很强的掌握。

### 一些定制Sass函数的定义（Defining Custom Sass Functions）

使用Sass提供的Ruby API，用户可以定义自己的Sass函数。关于这方面的更多信息，请参阅[源码文档](http://sass-lang.com/documentation/Sass/Script/Functions.html#adding_custom_functions)。

### 缓存的存储（Cache Stores）

Sass会将已解析的文档加以缓存，从而在这些文档没有变化之前，可在无需再度解析的情况下加以重用。默认Sass会在由`:cache_location`选项所表明的文件系统上的某个位置，写入这些缓存文件。在无法写入文件系统，或需要在ruby线程或机器之间共享缓存时，可定义出自己的缓存存储，并设置[`:cache_store`选项](http://sass-lang.com/documentation/file.SASS_REFERENCE.html#cache_store-option)。关于建立自己的缓存存储，请参阅[源码文档](http://sass-lang.com/documentation/Sass/CacheStores/Base.html)。

### 定制导入器（Custom Importers）

Sass的导入器是负责取得传递给`@import`的路径，并找到这些路径相应的Sass代码。默认代码是从[文件系统](http://sass-lang.com/documentation/Sass/Importers/Filesystem.html)装入的，但可添加一些从数据库、经由HTTP，或使用与Sass所期望的不同文件命名方案来装入。

各个导入器负责单个的装入路径（或后端所决定的某种概念，*译者注*: 数据库、HTTP的URI）。定制导入器可放在[`:load_paths`数组](http://sass-lang.com/documentation/file.SASS_REFERENCE.html#load_paths-option)旁边。

在解析某个`@import`时，Sass将遍历转入路径，查找某个成功装入该路径的导入器。在找到导入器后，就使用该导入的文件。

这些用户建立的导入器，必须继承自[Sass::Importers::Base](http://sass-lang.com/documentation/Sass/Importers/Base.html)。
