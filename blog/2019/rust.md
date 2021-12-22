---
layout: post
title: 'Rust'
categories: Mac Rust 笔记
comments: true
date: 2019-12-04 22:39:06 +0800
published: true
---

Title: Mac 下学习使用 *Rust*

## 安装

### brew 安装

测试之后, 环境有很多内容有没安装上, 估计也是没有配置环境的原因

### 官网方法

1. `curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh`

2. 导入环境参数 `export PATH="$PATH:$HOME/.cargo/bin"`

3. `rustc --version`

## 入门

### rustc 编译

随便写一个 `main.rs` 文件, 然后键入下述内容.

```rust
fn main() {
    println!("Hello, world!");
}
```

然后执行`rustc main.rs`得到编译后的可执行文件`./main`即可看到打印

### Cargo

如果安装的时候用的是官网的方法的话, 是会让你选择第几个安装方式, 我们通常选择第一个采用默认的方式, 这样就会把Cargo所需要的也就一起下载安装下来了. 在到我们配置环境输入的`PATH`也是一样

1. 新建项目
   `cargo new hello_cargo`

2. 编译项目
   `cargo build` or `cargo build --release`

3. 运行项目
   `cargo run`

### 编写猜谜游戏

1. 直接编写

    ```rust
    use std::io;    // 使用标准库的io

    fn main() {
        println!("Guess the number!");

        println!("Please input your guess.");

        let mut guess = String::new(); // 定义一个可变的变量

        io::stdin().read_line(&mut guess)   // 换行的原因只是因为过长了
            .expect("Failed to read line"); // 处理可能的报错

        println!("You guessed: {}", guess);
    }
    ```

2. 加入`rand`库

    在`Cargo.toml`文件中加入

    ```toml
    [dependencies]

    rand = "0.3.14"
    ```

    然后编译`cargo build`或者是`cargo run`可能会遇到
    `Blocking waiting for file lock on package cache`
    如果执行得是`cargo update`就不会遇到`Cargo.lock`文件了

    这里指定了`0.3.14`版本并不是真的就只使用该版本, 而是会使用兼容该版本的更高版本

    ```rust
    use std::io;
    use rand::Rng;  // 导入 随机库

    fn main() {
        println!("Guess the number!");

        let secret_number = rand::thread_rng().gen_range(1, 101);   // 生成一个 0 ~ 100 的随机数

        println!("The secret number is: {}", secret_number);    // 测试打印

        println!("Please input your guess.");

        let mut guess = String::new();

        io::stdin().read_line(&mut guess)
            .expect("Failed to read line");

        // trim 的是就是删除某些东西 由于 键入的时候最后面会敲击回车 导致\n会加入进来
        let guess: u32 = guess.trim().parse()   // 用 同一个变量名 去覆盖 guess 并转成 u32类型
            .expect("Please type a number!");   // 转换类型也是有可能报错的

        println!("You guessed: {}", guess);

        match guess.cmp(&secret_number) {
            Ordering::Less => println!("Too small!"),
            Ordering::Greater => println!("Too big!"),
            Ordering::Equal => println!("You win!"),
        }
    }
    ```

3. 加入循环

    ```rust
    // --snip--

        println!("The secret number is: {}", secret_number);

        loop {  // 加入循环
            println!("Please input your guess.");

            // --snip--

            match guess.cmp(&secret_number) {
                Ordering::Less => println!("Too small!"),
                Ordering::Greater => println!("Too big!"),
                Ordering::Equal => {
                    println!("You win!");
                    break;  // 在这里退出循环
                },
            }
        }
    }
    ```

4. 处理非数字的输入

    ```rust
    // --snip--

    io::stdin().read_line(&mut guess)
        .expect("Failed to read line");

    // 加入match来对报错的 continue来处理非数字的输入
    let guess: u32 = match guess.trim().parse() {
        Ok(num) => num,
        Err(_) => continue,
    };

    println!("You guessed: {}", guess);

    // --snip--
    ```

### 通用编程概念

#### 变量和可变性

1. 这里的变量不是指能变的量, 而是一个定义, 但只要赋予了 `mut` 才是真的可以变
2. 常量的命名规则 单词全大写 下划线分隔 就连int `100,000` 都可以表示为 `100_000`
3. 变量可以被重复声明并覆盖原值 但不能改变原有数据类型 也就是不能 string => int

#### 资料类型

1. 编译时需要帮忙确定类型

    ```rust
    let guess: u32 = "42".parse().expect("Not a number!");
    ```

2. 整型的表示形式有

    ```rust
    /*
        小数        98_222
        十六        0xff
        八进        0o77
        二元        0b1111_0000
        字节（u8仅） b'A'
    */
    ```

3. bool类型就只有真假 不会默认帮忙转换
4. 元组

    ```rust
    fn main() {
        let x: (i32, f64, u8) = (500, 6.4, 1);
        let five_hundred = x.0;
        let six_point_four = x.1;
        let one = x.2;
    }
    ```

5. 数组

    ```rust
    fn main() {
        let c: [i32; 5] = [1, 2, 3, 4, 5];
        let b = [3; 5];
        let a = [1, 2, 3, 4, 5];
        let first = a[0];
        let second = a[1];
    }
    ```

#### 函数

1. 不带;表示返回值
2. 指定返回值

    ```rust
    fn plus_one(x: i32) -> i32 {
        x + 1
    }
    ```

#### 注释

讲解Crates.io的时候才说

#### 控制流

1. 使用`if`的`let`语句

   ```rust
    fn main() {
        let condition = true;
        let number = if condition {
            5
        } else {
            6
        };

        println!("The value of number is: {}", number);
    }
   ```

2. 从循环里面返回值出来

    ```rust
    fn main() {
        let mut counter = 0;

        let result = loop {
            counter += 1;

            if counter == 10 {
                break counter * 2;// 我在想 这里没有; 为什么也能有值返回出去呢?
            }
        };

        println!("The result is {}", result);
    }
    ```

3. 遍历

    ```rust
    fn main() {
        let a = [10, 20, 30, 40, 50];

        // 方法1
        for element in a.iter() {
            println!("the value is: {}", element);
        }
        // 方法2
        for number in (1..4).rev() {
            println!("{}!", number);
        }
        // 方法3
        while index < 5 {
            println!("the value is: {}", a[index]);
            index += 1;
        }
    }
    ```

### 所有权

#### 什么是所有权

1. 每个内存只能被所有一次, 一旦被接管了就没了.

    ```rust
    // 下述代码就会报错
    let s1 = String::from("hello");
    let s2 = s1;

    println!("{}, world!", s1);

    /*
        error[E0382]: use of moved value: `s1`
        --> src/main.rs:5:28
        |
        3 |     let s2 = s1;
        |         -- value moved here
        4 |
        5 |     println!("{}, world!", s1);
        |                            ^^ value used here after move
        |
        = note: move occurs because `s1` has type `std::string::String`, which does
        not implement the `Copy` trait
    */
    ```

2. 如果想要拿到一样的内容的话 使用 `clone`
3. 对基础数据类型操作的是 会自动调用 `copy`, 由于都是在栈区, 不会产生新的内存空间
4. 如果直接把某个变量交付给某个函数, 而该函数没有移交所有权出来的话, 他将不能再被使用了

### 引用和借阅

1. `&` 表示引用该参数, 但不能进行变更, 如果要变更的话 需要 `&mut`

    ```rust
    fn main() {
        let mut s = String::from("hello");

        change(&mut s);
    }

    fn change(some_string: &mut String) {
        some_string.push_str(", world");
    }
    ```

2. 不能有两次可变引用, 因为不知道依据谁的改变
3. 同上, 如果还存在多个后续依旧会使用的不可变引用时候, 不能创建可变引用, 因为不可变的引用是不知道可变引用的存在的, 但如果在使用后并且后续不再使用了之后, 就允许创建可变引用了

    ```rust
    let mut s = String::from("hello");

    let r1 = &s; // no problem
    let r2 = &s; // no problem
    println!("{} and {}", r1, r2);  // 这里使用之后 后续就不再使用了 说明是可以的
    // r1 and r2 are no longer used after this point

    let r3 = &mut s; // no problem
    println!("{}", r3);
    ```

4. 悬空, 什么意思呢, 可以理解为僵尸指针

    ```rust
     fn main() {
        let reference_to_nothing = dangle();
    }

    fn dangle() -> &String {    // 这里将返回一个带有引用的数据类型
        let s = String::from("hello");  // 生成一个新的数据类型, 开辟可以一个新的内存空间

        &s  // 移交引用出去 代表是 我只是借你拿去用的意思
    }   // 但这里就已经被释放了 产生 僵尸指针

    fn no_dangle() -> String {
        let s = String::from("hello");

        s   // 这里是把所有权给出去了 代表是 我开辟的空间 我不要了 你拿去用吧
    }   // 这样给出去的内存就不会被释放了
    ```

#### 切片类型

1. 先看一个获取第一个单词的函数

    ```rust
    // 借阅一个字符串   返回单词的下标
    fn first_word(s: &String) -> usize {
        // 转换为数组
        let bytes = s.as_bytes();

        // 遍历 bytes.iter() 并且创建迭代器 enumerate() 可以理解为 enumerate() 会产生出一个元组来
        for (i, &item) in bytes.iter().enumerate() {
            //  借阅到了 item
            if item == b' ' {
                return i;
            }
        }

        s.len() // 乍一看没有问题 但, 其实这里涉及到了很多问题, 比方单词长度未知和 s 被销毁了 这组数据就失效了
    }
    ```

2. 引入切片

    ```rust

    fn main() {
        let s = String::from("hello");

        let len = s.len();
        let slice = &s[0..2];
        let slice = &s[..2];
        let slice = &s[3..len];
        let slice = &s[3..];
        let slice = &s[0..len];
        let slice = &s[..];
    }
    ```

3. `&str` 表示的是切片类型 `&String` 表示的字符串类型

4. 有了切片这个概念之后就可以改写取第一个单词的函数了

    ```rust
    fn first_word(s: &String) -> &str {
        let bytes = s.as_bytes();

        for (i, &item) in bytes.iter().enumerate() {
            if item == b' ' {
                return &s[0..i];    // 直接返回切片
            }
        }
        // 刚好这里的 s 是借来的 所以直接拿着这玩意 转借给别人就行了 没我啥事了的意思
        &s[..]
    }
    ```

5. 使用上述代码

    ```rust
    fn main() {
        let mut s = String::from("hello world");

        let word = first_word(&s); // 这个切片还是用的 s 的

        s.clear(); // 这里就会直接报错了 因为会获取s的可变引用并且把它清空, 而 world是 first_word 借了s又转手给了word的一个不可变引用

        println!("the first word is: {}", word);
    }
    ```

6. 把传入的 `&String` 类型变成 `&str` 类型 就可以接受 切片和字符串了 因为字符串就是全切片
7. 其他的切片

    ```rust
        let a = [1, 2, 3, 4, 5];    // 他的类型是   [i32; 5]
        let slice = &a[1..3];       // 切片的类型是 &[i32]
    ```

### 使用结构体来构造相关数据

#### 定义和实例化结构

1. 定义一个结构体

    ```rust
    struct User {
        username: String,   // 现在先不声明为 &str 切片类型 会涉及到生命周期
        email: String,
        sign_in_count: u64,
        active: bool,
    }

    fn build_user(email: String, username: String) -> User {
        User {
            email: email,
            username: username,
            active: true,
            sign_in_count: 1,
        }
    }
    // 简化写法
    fn build_user(email: String, username: String) -> User {
        User {
            email,
            username,
            active: true,
            sign_in_count: 1,
        }
    }

    fn main() {
        let mut user1 = User {
            email: String::from("someone@example.com"),
            username: String::from("someusername123"),
            active: true,
            sign_in_count: 1,
        };

        // 点语法直接更改
        user1.email = String::from("anotheremail@example.com");

        // 新建user2
        let user2 = User {
            email: String::from("another@example.com"),
            username: String::from("anotherusername567"),
            active: user1.active,
            sign_in_count: user1.sign_in_count,
        };

        // 但可以写成这样
        let user2 = User {
            email: String::from("another@example.com"),
            username: String::from("anotherusername567"),
            ..user1 // 其他字段沿用该实例
        };
    }
    ```

2. 元组结构

    ```rust
    struct Color(i32, i32, i32);
    struct Point(i32, i32, i32);

    let black = Color(0, 0, 0);
    let origin = Point(0, 0, 0);
    ```

3. 打印结构 首先添加 `#[derive(Debug)]` 和 然后改 `{}` 为 `{:?}` 或 `{:#?}` 多行打印
   单行打印 : 表示打印出来的键值中间的 : ? 表示的是 值 # 表示立起来 变成多行 形式主义.. 个人理解

    ```rust
    #[derive(Debug)]
    struct Rectangle {
        width: u32,
        height: u32,
    }

    fn test_rect() {
        let rect1 = Rectangle { width: 30, height: 50 };

        println!("rect1 is {:?}", rect1);   // 表示的意思是
        println!("rect1 is {:#?}", rect1);
    }

    ```

#### 方块语法

1. 实现一个方法

    ```rust
    #[derive(Debug)]
    struct Rectangle {
        width: u32,
        height: u32,
    }

    // 实现 可以有多个实现
    impl Rectangle {
        // 这里的self都只是借来的 只做访问变量使用
        // 但如果要用来修改其内容的话 也是需要加上mut
        fn area(&self) -> u32 {
            self.width * self.height
        }
    }

    impl Rectangle {
        // 可以理解为定义了一个 类函数 只能通过类来调用 调用方式 采用 :: 双冒号形式
        fn square(size: u32) -> Rectangle {
            Rectangle { width: size, height: size }
        }
    }

    fn main() {
        let rect1 = Rectangle { width: 30, height: 50 };

        println!(
            "The area of the rectangle is {} square pixels.",
            rect1.area()
        );

        let sq = Rectangle::square(3)
    }

    ```

2. 自动修改调用的第一个参数类型, 仅仅针对 `self` 参数   会自动添加他的变体 `&`，`&mut` 或 `*`

    ```rust
    #![allow(unused_variables)]
    fn main() {
        #[derive(Debug,Copy,Clone)]
        struct Point {
            x: f64,
            y: f64,
        }

        impl Point {
            fn distance(&self, other: &Point) -> f64 {
                let x_squared = f64::powi(other.x - self.x, 2);
                let y_squared = f64::powi(other.y - self.y, 2);

                f64::sqrt(x_squared + y_squared)
            }
        }
        let p1 = Point { x: 0.0, y: 0.0 };
        let p2 = Point { x: 5.0, y: 6.5 };
        // 这两个方法的调用时一无所谓的
        p1.distance(&p2);
        (&p1).distance(&p2);
    }
    ```

#### 枚举

1. 不得不承认 这么没有很吸引我

    ```rust
    // 正常使用
    enum IpAddrKind {
        V4,
        V6,
    }
    // 混用
    enum IpAddr {
        V4(u8, u8, u8, u8),
        V6(String),
    }

    struct Ipv4Addr {
    // --snip--
    }

    struct Ipv6Addr {
        // --snip--
    }

    // 结构体使用
    enum IpAddr {
        V4(Ipv4Addr),
        V6(Ipv6Addr),
    }

    // 强大所在
    enum Message {
        Quit,
        Move { x: i32, y: i32 },
        Write(String),
        ChangeColor(i32, i32, i32),
    }

    impl Message {
        // 还能...实现 函数!!!
        fn call(&self) {
            // method body would be defined here
        }
    }

    ```

2. Option
    null的发明者Tony Hoare在2009年的演讲“ Null References：十亿美元的错误”中说：

    ```text
        我称之为我的十亿美元错误。当时，我正在设计第一个全面的类型系统，以使用面向对象的语言进行引用。我的目标是确保所有引用的使用都绝对安全，并由编译器自动执行检查。但是我忍不住要插入一个空引用的诱惑，仅仅是因为它是如此容易实现。这导致了无数错误，漏洞和系统崩溃，在最近四十年中可能造成十亿美元的痛苦和破坏。
    ```

    ```rust
    enum Option<T> {
        Some(T),    // 泛型
        None,
    }
    fn main() {
        let some_number = Some(5);
        let some_string = Some("a string");     // Some 直接赋值即可推测类型了
        let absent_number: Option<i32> = None;  // None 没有类型 那么就需要指代类型
    }
    ```

    加入Option 旨在限制null的普遍性并提高Rust代码的安全性。

3. 匹配控制流 `match`

    一个强大的武器

    ```rust
    enum UsState {
        Alabama,
        Alaska,
        // --snip--
    }

    enum Coin {
        Penny,      // 1 美分
        Nickel,     // 5 美分
        Dime,       // 10 美分
        Quarter(UsState),    // 25 美分
    }

    fn value_in_cents(coin: Coin) -> u8 {
        match coin {
            // 类函数的调用方式 指定 枚举的每个值
            Coin::Penny => {    // => 匹配后直接赋值的意思
                println!("Lucky penny!");
                1   // 返回值为1
            },
            Coin::Nickel => 5,
            Coin::Dime => 10,
            Coin::Quarter(state) => {
                println!("State quarter from {:?}!", state);
                25
            },
        }
    }
    ```

4. `match` 搭配 `Option<T>`

    ```rust
    fn plus_one(x: Option<i32>) -> Option<i32> {
        match x {
            None => None,
            Some(i) => Some(i + 1),
        }
    }

    let five = Some(5);
    let six = plus_one(five);
    let none = plus_one(None);
    ```

5. `_` 占位符 类似于 `default`

    ```rust
    let some_u8_value = 0u8; // 等价于  let some_u8_value : u8 = 1; 
    match some_u8_value {
        1 => println!("one"),
        3 => println!("three"),
        5 => println!("five"),
        7 => println!("seven"),
        _ => (),
    }
    ```

6. 就算使用了占位符 但如果我们只要匹配一种模式的话 用`match`有点焉用牛刀的感觉了 所以引入了 `if let`

    ```rust
    // 牛刀模式
    let some_u8_value = Some(0u8);
    match some_u8_value {
        Some(3) => println!("three"),
        _ => (),
    }
    // 简约模式
    if let Some(3) = some_u8_value {
        println!("three");
    }

    ```

    换句话说，您可以将其`if let`视为`match`当值匹配一个模式然后忽略所有其他值时运行代码的语法语法。

### 使用包(头文件)

#### 包

1. 在使用`cargo`的时候, 生成出来的 `src` 其实就是一个包

#### 模块 `mod`

1. 样板

    ```rust
    mod front_of_house {
        // 如果这里不添加 pub 的话 是没有办法在外部使用的
        pub mod hosting {
            pub fn add_to_waitlist() {}
            fn seat_at_table() {}
        }

        mod serving {
            fn take_order() {}
            fn serve_order() {}
            fn take_payment() {}
        }
    }


    pub fn eat_at_restaurant() {
        // 绝对路径调用的时候 采用的关键字是 crate 箱子 其实可以理解为当前目录 root
        crate::front_of_house::hosting::add_to_waitlist();

        // 相对路径调用的时候可以省略
        front_of_house::hosting::add_to_waitlist();
    }
    ```

2. 模块树

    ```rust
    crate
    └── front_of_house
        ├── hosting
        │   ├── add_to_waitlist
        │   └── seat_at_table
        └── serving
            ├── take_order
            ├── serve_order
            └── take_payment
    ```

3. 起始相对路径 `super`

    ```rust
    fn serve_order() {}

    mod back_of_house {
        fn fix_incorrect_order() {
            cook_order();
            // 这里的super意思就是 back_of_house 而且 serve_order 和 super 同级
            super::serve_order();
        }

        fn cook_order() {}
    }
    fn main() {}

    ```

#### 使用 `use` 来引入路径 缩短路径

1. 正常使用

    ```rust
    mod front_of_house {
        pub mod hosting {
            pub fn add_to_waitlist() {}
        }
    }

    use crate::front_of_house::hosting;

    pub fn eat_at_restaurant() {
        // 绝对路径下
        crate::front_of_house::hosting::add_to_waitlist();
        // 相对路径下
        front_of_house::hosting::add_to_waitlist();
        // 被缩短的使用方式
        hosting::add_to_waitlist();
    }
    ```

2. `as` 来重写命名

    ```rust
    fn main() {
        use std::fmt::Result;
        use std::io::Result as IoResult;

        fn function1() -> Result {
            // --snip--
            Ok(())
        }

        fn function2() -> IoResult<()> {
            // --snip--
            Ok(())
        }
    }
    ```

3. 导出 `pub use`

    ```rust
    mod front_of_house {
        pub mod hosting {
            pub fn add_to_waitlist() {}
        }
    }
    // 外部访问可以直接访问 hosting::add_to_waitlist()
    pub use crate::front_of_house::hosting;

    pub fn eat_at_restaurant() {
        hosting::add_to_waitlist();
        hosting::add_to_waitlist();
        hosting::add_to_waitlist();
    }
    fn main() {}

    ```

4. 对于同一包下的多个路径使用嵌套处理 `{ , }`

    ```rust
    use std::io;
    use std::io::Write;
    use std::cmp::Ordering;

    use std::{cmp::Ordering, io};
    // 对于路径本身 使用 self
    use std::io::{self, Write};
    ```

5. 导入所有的公共项目

    ```rust
    use std::collections::*;
    ```

6. 模块 `mod` 分文件存放

    这个不需要太多的内容去写 大概就是和安卓的机制类似 文件夹存放即可

### 常用的一些键值保存的东西

#### 矢量

1. 矢量 `Vec` 可以存放任何类型, 但仅限于同一类型的, 所以可以借助 `enum` 来达到混存的功能

    ```rust  
    let v: Vec<i32> = Vec::new();
    v.push(5);
    v.push(6);
    let v = vec![1, 2, 3];

    enum SpreadsheetCell {
        Int(i32),
        Float(f64),
        Text(String),
    }

    let row = vec![
        SpreadsheetCell::Int(3),
        SpreadsheetCell::Text(String::from("blue")),
        SpreadsheetCell::Float(10.12),
    ];
    ```

2. 如果已经生成过了个 不可变 的引用之后, 再继续对其push

    ```rust
    let mut v = vec![1, 2, 3, 4, 5];
    let first = &v[0];  // 产生不可变的引用之后
    v.push(6);          // 这里会生成 可变
    println!("The first element is: {}", first);
    ```

3. 可以直接对其遍历

    ```rust
    let v = vec![100, 32, 57];
    for i in &v {
        println!("{}", i);
    }
    // 如果要改值得话 需要加 mut
    for i in &mut v {
        // 甚至是直接遍历的时候更改他的值
        *i += 50; // * 有点强买强卖的问道
    }
    ```

#### String

1. 不能对 `String` 索引

    ```rust
    let hello = "Здравствуйте";
    let answer = &hello[0]; // 因为Unicode吗的字节长度是不定的
    ```

2. 字符串的一些相关操作

    ```rust
    // 追加
    let mut s1 = String::from("foo");
    let s2 = "bar";
    s1.push_str(s2); // 这里并不会转让所有权
    println!("s2 is {}", s2);

    let mut s = String::from("lo");
    s.push('l');

    // 合并
    // 加号
    let s1 = String::from("Hello, ");
    let s2 = String::from("world!");
    let s3 = s1 + &s2; // s1 的所有权被移交出去了 + 号其实调用的是 add 方法

    // 格式化
    let s1 = String::from("tic");
    let s2 = String::from("tac");
    let s3 = String::from("toe");
    let s = format!("{}-{}-{}", s1, s2, s3);
    ```

3. 但可以对字符串做范围切片 但是会可能报错

    ```rust
    let hello = "Здравствуйте"; // 这里的一个字符占两个字节
    let s = &hello[0..4];       // 所以 0到4 取出来的是 'Зд'
    // 一旦取了 [0..1] 或者是 [0..3] 就会导致字符无法被正常切出来 会报错
    ```

4. 遍历字符串的真正字符 使用 `chars`

    ```rust
    for c in "नमस्ते".chars() {
        println!("{}", c);
    }
    ```

5. 或者遍历字符串的字节码 使用 `bytes`

    ```rust
    for b in "नमस्ते".bytes() {
        println!("{}", b);
    }
    ```

#### HashMap

1. 所有的键值必须一致, 也就是键的类型要一致, 值的类型也要一致

2. 使用

    ```rust
    use std::collections::HashMap;

    let mut scores = HashMap::new();
    // 一个一个插入
    scores.insert(String::from("Blue"), 10);
    scores.insert(String::from("Yellow"), 50);

    // 先创建所有的键 和 值 存放到 vec当中
    let teams  = vec![String::from("Blue"), String::from("Yellow")];
    let initial_scores = vec![10, 50];

    // 这里的 下划线是可以编译器 自己去猜测的
    let scores: HashMap<_, _> = teams.iter().zip(initial_scores.iter()).collect();
    ```

3. 会接收所有权

    ```rust
    let field_name = String::from("Favorite color");
    let field_value = String::from("Blue");

    let mut map = HashMap::new();
    map.insert(field_name, field_value);
    // 下面这行代码会报错的 所有权失效了
    println!("{}, {}", field_name, field_value);
    ```

4. 获取值 `get` 返回的是个 `Option` 值 因为是有可能为 `None`的

    ```rust
    scores.insert(String::from("Blue"), 10);
    scores.insert(String::from("Yellow"), 50);

    let team_name = String::from("Blue");
    let score = scores.get(&team_name);
    // score => Some(10)
    ```

5. 仅当键没有值时才插入值 `entry` `or_insert`

    ```rust
    let mut scores = HashMap::new();
    scores.insert(String::from("Blue"), 10);

    scores.entry(String::from("Yellow")).or_insert(50);
    scores.entry(String::from("Blue")).or_insert(50);   // 这里不会生效

    println!("{:?}", scores);
    ```

6. 更新值 但这里感觉有点问题

    ```rust
    let text = "hello world wonderful world";

    let mut map = HashMap::new();

    for word in text.split_whitespace() {
        let count = map.entry(word).or_insert(0);
        *count += 1; // 在这里更新了 但是就怎么那么怪呢
    }

    println!("{:?}", map);


    // 如果按照上述这个思路的话
    let score = scores.entry(String::from("Blue")).or_insert(1);
    *score += 1;
    ```

### 报错 `panic!`

1. 关于 `panic!`

2. `Result`

    这是一个枚举, 表示这个值可以是有两种结果, 如果是`OK`会附带对应的`<T>`类型, 如果是`Err`的话, 将会是报错

    ```rust
    enum Result<T, E> {
        Ok(T),
        Err(E),
    }
    use std::fs::File;

    fn main() {
        let f = File::open("hello.txt");

        let f = match f {
            Ok(file) => file,
            Err(error) => {
                // 这里的 panic! 表示会直接停止在这里
                panic!("Problem opening the file: {:?}", error)
            },
        };
    }

    // 甚至可以匹配不同的错误 也就是针对 err 的错误类型做文章
    use std::fs::File;
    use std::io::ErrorKind;

    fn main() {
        let f = File::open("hello.txt");

        let f = match f {
            Ok(file) => file,
            Err(error) => match error.kind() {
                ErrorKind::NotFound => match File::create("hello.txt") {
                    Ok(fc) => fc,
                    Err(e) => panic!("Problem creating the file: {:?}", e),
                },
                other_error => panic!("Problem opening the file: {:?}", other_error),
            },
        };
    }
    ```

3. 闭包

    如果在使用多个`match`会使得代码看起来很原始

    ```rust
    use std::fs::File;
    use std::io::ErrorKind;

    fn main() {
        let f = File::open("hello.txt").unwrap_or_else(|error| {
            if error.kind() == ErrorKind::NotFound {
                File::create("hello.txt").unwrap_or_else(|error| {
                    panic!("Problem creating the file: {:?}", error);
                })
            } else {
                panic!("Problem opening the file: {:?}", error);
            }
        });
    }
    ```

4. 新的关键字用来单独解决报错 `unwrap` 和 `expect`

    ```rust
    use std::fs::File;

    fn main() {
        let f = File::open("hello.txt").unwrap();   // 如果报错 会直接中断在这里
    }

    fn main() {
        let f = File::open("hello.txt").expect("Failed to open hello.txt"); // 如果报错 会直接显示错误信息 并且中断
    }
    ```

5. 传递报错

    ```rust
    fn main() {
        use std::io;
        use std::io::Read;
        use std::fs::File;

        // 首先看返回值 是个 Result
        fn read_username_from_file() -> Result<String, io::Error> {
            let f = File::open("hello.txt");
            // 判断 f 是否是错误 如果是的话直接返回报错 否则直接赋值为文件的 句柄
            let mut f = match f {
                Ok(file) => file,
                Err(e) => return Err(e),
            };

            let mut s = String::new();

            // 匹配文件读出来的内容给到 新建的 s 当中去
            match f.read_to_string(&mut s) {
                Ok(_) => Ok(s),
                Err(e) => Err(e),
            }   // 这里没有 ; 表示这里就是返回值了
        }
    }
    ```

6. 由于以上传递 非常常见 导致可以 用 `?` 使其精简 

    ```rust
    use std::io;
    use std::io::Read;
    use std::fs::File;

    fn read_username_from_file() -> Result<String, io::Error> {
        let mut f = File::open("hello.txt")?;
        let mut s = String::new();
        f.read_to_string(&mut s)?;
        Ok(s)
    }
    ```

    该`?`放在后`Result`值定义为工作在几乎相同的方式`match`表达我们定义来处理`Result`
    也就是可以直接做到简化返回操作的能力
    甚至更加的精简

    ```rust
    use std::io;
    use std::io::Read;
    use std::fs::File;

    fn read_username_from_file() -> Result<String, io::Error> {
        let mut s = String::new();
        File::open("hello.txt")?.read_to_string(&mut s)?;
        Ok(s)
    }
    ```

    好吧 其实还可以超级精简

    ```rust
    use std::io;
    use std::fs;

    fn read_username_from_file() -> Result<String, io::Error> {
        // 我觉得这里已经癫了 直接帮你写好了 打开文件夹并且获取内容 并且返回出去...
        fs::read_to_string("hello.txt")
    }
    ```

7. 那么这个`?`能用在别的地方吗? 不能的 只能用在返回值为 `Result` 的函数上

    ```rust
    // 错误代码

    use std::fs::File;

    fn main() {
        let f = File::open("hello.txt")?;
    }
    ```

    这里说一嘴 `main` 函数的返回值是 `()` 我完全不知道这是个什么类型...

    但你可以这么写

    ```rust
    use std::error::Error;
    use std::fs::File;

    fn main() -> Result<(), Box<dyn Error>> {
        let f = File::open("hello.txt")?;
        // 返回了 () 的同时 耶 完成了 ?
        Ok(())
    }
    ```

    但这里出现了个新的玩意 `Box<dyn Error>` `Box` 看了文档不是很懂 `pub struct Box<T: ?Sized>(Unique<T>);`
    但 `dyn` 表示可以是任何类型
    所以 `Box<dyn Error>` 可以理解为 任何类型的错误

### 泛型 特征 和 生命周期

#### 特征

1. 定义共同接口

    ```rust
    pub trait Summary {
        fn summarize(&self) -> String;
    }

    pub struct NewsArticle {
        pub headline: String,
        pub location: String,
        pub author: String,
        pub content: String,
    }

    // 实现接口 对于 NewsArticle 这个结构体来说
    impl Summary for NewsArticle {
        fn summarize(&self) -> String {
            format!("{}, by {} ({})", self.headline, self.author, self.location)
        }
    }

    pub struct Tweet {
        pub username: String,
        pub content: String,
        pub reply: bool,
        pub retweet: bool,
    }

    // 实现接口 对于 Tweet 这个结构体来说
    impl Summary for Tweet {
        fn summarize(&self) -> String {
            format!("{}: {}", self.username, self.content)
        }
    }

    ```

2. 不能实现外部特征, 只能本地使用

3. 可以默认实现特征, 这样本地就都可以使用了

4. 特征可以作为参数, 也就是必须实现这个特征的任意类型

    ```rust
    // 单独使用
    pub fn notify(item: impl Summary) {
        println!("Breaking news! {}", item.summarize());
    }

    // 提取出来使用
    pub fn notify<T: Summary>(item: T) {
        println!("Breaking news! {}", item.summarize());
    }

    // 正常单独使用多个
    pub fn notify(item1: impl Summary, item2: impl Summary) {

    }

    // 但可以写成这样
    pub fn notify<T: Summary>(item1: T, item2: T) {

    }

    // 可以相加
    pub fn notify(item: impl Summary + Display) {

    }

    // 当然也可以提取出来
    pub fn notify<T: Summary + Display>(item: T) {

    }

    // 但如果有多个的时候 就会很乱
    fn some_function<T: Display + Clone, U: Clone + Debug>(t: T, u: U) -> i32 {

    }

    // 可以使用 where 来后续补充说明
    fn some_function<T, U>(t: T, u: U) -> i32
        where T: Display + Clone,
            U: Clone + Debug
    {

    }
    ```

5. 既然能做参数, 那么也能做返回值

    ```rust
    fn returns_summarizable() -> impl Summary {
        Tweet {
            username: String::from("horse_ebooks"),
            content: String::from("of course, as you probably already know, people"),
            reply: false,
            retweet: false,
        }
    }

    // 但有局限性 也就是说 这样是不允许的 只允许返回一个类型
    fn returns_summarizable(switch: bool) -> impl Summary {
        if switch {
            NewsArticle {
                // ...
            }
        } else {
            Tweet {
                // ...
            }
        }
    }
    ```

6. 完成之前的比大小

    ```rust
    // PartialOrd 可以比较 Copy 可以进行拷贝 代表就是在堆上的值
    fn largest<T: PartialOrd + Copy>(list: &[T]) -> T {
        let mut largest = list[0];

        for &item in list.iter() {
            if item > largest {
                largest = item;
            }
        }

        largest
    }
    ```

#### `lifetime` 寿命

1. 三条规则
   1. 作为引用的参数都有其自己的寿命 `fn foo<'a, 'b>(x: &'a i32, y: &'b i32);`
   2. 如果存在一个有输入寿命的参数的时候, 那么返回的也得是这个带有寿命的参数
   3. 如果有多个不同寿命参数, 但其中有的是 `&self` 或者是 `&mut self`, 那么就把 `self` 分配给所有输出寿命参数???

    ```rust
    // 分析 1
    fn first_word(s: &str) -> &str {
    // 由于没有指定 那么就算是 先执行第一条规则 给所有的引用参数指定寿命
    fn first_word(s: &'a str) -> &str {
    // 又只有一个寿命类型, 那么把输入的寿命给到输出
    fn first_word(s: &'a str) -> &'a str {
    // 那么现在，此函数所有引用都具有寿命，并且编译器可以继续进行分析，所以我们就不用编写这个寿命了


    // 分析 2
    fn longest(x: &str, y: &str) -> &str {
    // 由于没有指定 入参的寿命 所以先执行第一条规则
    fn longest(x: &'a str, y: &'b str) -> &str {
    // 第二条规则适用? 由于有多个不适用
    // 第三条规则呢? 没有 self 也不适用
    // 所以这个编译的时候 就会报错
    ```

### 自动化测试

### 构建命令行程序

### 闭包和迭代器

#### 闭包

1. 可以不指定数据类型, 但使用的时候 不能乱用, 他不是泛型

    ```rust
    fn  add_one_v1   (x: u32) -> u32 { x + 1 }  // 函数 完整版
    let add_one_v2 = |x: u32| -> u32 { x + 1 }; // 闭包 完整版
    let add_one_v3 = |x|             { x + 1 }; // 闭包 删除指定数据类型
    let add_one_v4 = |x|               x + 1  ; // 闭包 删除花括号


    // 但在使用后上
    let example_closure = |x| x;

    let s = example_closure(String::from("hello")); // 使用了字符串作为参数传入
    let n = example_closure(5);                     // 又使用了 数字  这里会崩
    ```

2. 闭包也是有特征的, 这样的话就可以作为泛型的参数传入了 `Fn` `FnMut` `FnOnce`

    ```rust
    struct Cacher<T>
        where T: Fn(u32) -> u32
    {
        calculation: T,
        value: Option<u32>,
    }
    ```

3. 闭包可以使用外部的变量

    ```rust
    fn main() {
        let x = 4;

        let equal_to_x = |z| z == x;    // 使用了 x
        // fn equal_to_x(z: i32) -> bool { z == x } //这个就会崩

        let y = 4;

        assert!(equal_to_x(y));
    }
    ```

    所以说闭包是会强制获取所有权的
    `FnOnce`    获取完后 但只能调用一次
    `FnMut`     可变的形式获取了值
    `Fn`        不可变的形式获取了值

#### 迭代器

1. 特征为 `Iterator` 和 具有 `next` 方法

    ```rust
    pub trait Iterator {
        type Item;

        fn next(&mut self) -> Option<Self::Item>;
    }
    ```

2. `next` 是会消耗掉的

    ```rust
    #[test]
    fn iterator_demonstration() {
        let v1 = vec![1, 2, 3];

        let mut v1_iter = v1.iter();

        assert_eq!(v1_iter.next(), Some(&1));
        assert_eq!(v1_iter.next(), Some(&2));
        assert_eq!(v1_iter.next(), Some(&3));
        assert_eq!(v1_iter.next(), None);
    }

    fn iterator_sum() {
        let v1 = vec![1, 2, 3];
        let v1_iter = v1.iter();
        let total: i32 = v1_iter.sum();
        assert_eq!(total, 6);
    }
    ```

3. 迭代器是不会自己调用的

    ```rust
    let v1: Vec<i32> = vec![1, 2, 3];

    v1.iter().map(|x| x + 1);   // 这么使用时会收到警告 说明这行代码没有起到任何作用

    let v2: Vec<_> = v1.iter().map(|x| x + 1).collect();    // 直接进行迭代

    assert_eq!(v2, vec![2, 3, 4]);
    ```

4. 使用场景

    ```rust
    #![allow(unused_variables)]
    fn main() {
    #[derive(PartialEq, Debug)]
    struct Shoe {
        size: u32,
        style: String,
    }

    fn shoes_in_my_size(shoes: Vec<Shoe>, shoe_size: u32) -> Vec<Shoe> {
        shoes.into_iter()
            .filter(|s| s.size == shoe_size)
            .collect()
    }

    #[test]
    fn filters_by_size() {
        let shoes = vec![
            Shoe { size: 10, style: String::from("sneaker") },
            Shoe { size: 13, style: String::from("sandal") },
            Shoe { size: 10, style: String::from("boot") },
        ];

        let in_my_size = shoes_in_my_size(shoes, 10);

        assert_eq!(
            in_my_size,
            vec![
                Shoe { size: 10, style: String::from("sneaker") },
                Shoe { size: 10, style: String::from("boot") },
            ]
        );
    }
    }
    ```

### Crates.io

### 智能指针

1. `Rc<T>` 允许对一个变量有多个所有者；`Box<T>` 和 `RefCell<T>` 只能有一个所有者。
2. `Box<T>` 允许在编译时检查是不可变还是可变的；`Rc<T>` 只允许在编译时检查不可变的引用；`RefCell<T>` 允许在运行时检查不可变或可变的引用。
3. 由于`RefCell<T>`允许在运行时检查可变引用，因此 `RefCell<T>` 即使`RefCell<T>` 是不可变的，也可以在内部改变值。

### 并发

#### 线程

1. 创建线程 `thread::spawn`

2. 等待该线程跑完 `join` 阻塞的

3. 线程内使用外部的值 其实也可以看做是 闭包内使用外部变量 但闭包是在单一线程下使用的 `move` 是针对线程闭包的 所以 会强制获取所有权

#### 通道

1. 例子

    ```rust
    use std::thread;
    use std::sync::mpsc;

    fn main() {
        let (tx, rx) = mpsc::channel();

        thread::spawn(move || {
            let val = String::from("hi");
            tx.send(val).unwrap();  // 移交所有权
        });

        let received = rx.recv().unwrap();
        println!("Got: {}", received);
    }
    ```

#### 上锁 

1. 互斥 和 原子引用计数

    ```rust
    use std::sync::{Mutex, Arc};
    use std::thread;

    fn main() {
        let counter = Arc::new(Mutex::new(0));
        let mut handles = vec![];

        for _ in 0..10 {
            let counter = Arc::clone(&counter);
            let handle = thread::spawn(move || {
                let mut num = counter.lock().unwrap();

                *num += 1;
            });
            handles.push(handle);
        }

        for handle in handles {
            handle.join().unwrap();
        }

        println!("Result: {}", *counter.lock().unwrap());
    }
    ```