# Texture Import Settings

**Texture Import Settings** 窗口定义 Unity 如何将图像从项目的 `Assets` 文件夹导入 Unity Editor。

要访问此窗口，请在 Project 窗口中选择图像文件。此时会在 Inspector 中显示 **Texture Import Settings** 窗口。

**注意：**默认情况下会隐藏一些不太常用的属性。在 Inspector 窗口中展开 [Advanced][1] 部分即可查看这些属性。

![Texture Import Settings 窗口](https://docs.unity3d.com/cn/current/uploads/Main/class-TextureImporter.png)

Texture Import Settings 窗口

Texture Import Settings 窗口上有多个部分：

**(A)** [Texture Type][2]。选择要创建的纹理类型。

**(B)** [Texture Shape][3]。在该区域中选择形状并设置特定于该形状的属性。

**(C)** [特定于类型的设置和高级设置][4]。根据所选择的 **Texture Type** 值，此区域中可能会显示其他属性。有关更多信息，请参阅[纹理类型][5]的文档。

**(D)** [特定于平台的覆盖][6]。使用\_\_特定于平台的覆盖 (Platform-specific overrides)\_\_ 面板可设置默认选项以及针对特定平台覆盖这些选项。

**(E)** **纹理预览**。在此处可以预览纹理以及调整其值。

## Texture Type

使用 **Texture Type** 属性可选择要从源图像文件创建的纹理类型。Texture Import Settings 窗口中的其他属性将根据此处设置的值而变化。

有关特定纹理类型的信息，请参阅[纹理类型 (Texture Types)][7] 文档。


| **属性：**                    | **功能：**                                                                                                                                                                                                             |
| ------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Default**                   | 这是用于所有纹理的最常用设置。此选项可用于访问大多数纹理导入属性。有关更多信息，请参阅[Default][8] 纹理类型。                                                                                                          |
| **Normal map**                | 选择此选项可将颜色通道转换为适合实时法线贴图的格式。有关更多信息，请参阅[Normal map][9] 纹理类型文档。<br/><br/>有关一般法线贴图的更多信息，请参阅[导入纹理][10]。                                                     |
| **Editor GUI and Legacy GUI** | 如果要在任何 HUD 或 GUI 控件上使用纹理，请选择此选项。有关更多信息，请参阅[Editor GUI and Legacy GUI][11] 纹理类型文档。                                                                                               |
| **Sprite (2D and UI)**        | 如果要在 2D 游戏中使用该纹理作为[精灵][12]，请选择此选项。有关更多信息，请参阅 [Sprite (2D and UI)][13] 纹理类型文档。                                                                                                 |
| **Cursor**                    | 如果要将纹理用作自定义游标，请选择此选项。有关更多信息，请参阅[Cursor][14] 纹理类型文档。                                                                                                                              |
| **Cookie**                    | 选择此选项可通过基本参数来设置纹理，从而将其用于场景[光源][15]的[剪影][16]。有关更多信息，请参阅 [Cookie][17] 纹理类型文档。                                                                                           |
| **光照贴图**                  | 如果要将纹理用作[光照贴图][18]，请选择此选项。此选项允许将纹理编码为特定格式（RGBM 或 dLDR，具体取决于平台）并通过后期处理步骤对纹理数据进行处理（推拉式扩张通道）。有关更多信息，请参阅 [Lightmap][19] 纹理类型文档。 |
| **Single Channel**            | 如果在纹理中只需要一个通道，请选择此选项。有关仅可用于此类型的属性的信息，请参阅[Single Channel][20] 纹理类型文档。                                                                                                    |

## Texture Shape

使用 **Texture Shape** 属性可选择和定义纹理的形状和结构。有四种形状类型：

- **2D** 是用于所有纹理的最常用设置；它将图像文件定义为 2D 纹理。这些设置用于将纹理映射到 3D 网格和 GUI 元素以及其他项目元素。
- **Cube** 将纹理定义为[立方体贴图][21]。例如，可将其用于天空盒或反射探针。此类型仅可用于 [Default][22]、[Normal Map][23] 和 [Single Channel][24] 纹理类型。
- **2D Array** 将纹理定义为 [2D 数组纹理][25]。这通常用作某些渲染技术的优化，其中会使用许多具有相同大小和格式的纹理。
- **3D** 将纹理定义为 [3D 纹理][26]。某些渲染技术使用 3D 纹理表示体积数据。

### 立方体贴图

可使用以下属性进一步优化 **Cubemap** 形状纹理：


| **属性：**                                | **功能：**                                                                                                                                                                                           |
| ------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Mapping**                               | 使用**Mapping** 可指定如何将纹理投影到游戏对象上。默认情况下，此设置为 **Auto**。                                                                                                                    |
| ->**Auto**                                | Unity 尝试根据纹理信息创建布局。                                                                                                                                                                     |
| ->**6 Frames Layout (Cubic Environment)** | 纹理包含按以下标准立方体贴图布局之一排列的六个图像：交叉或序列 (+x -x +y -y +z -z)。图像可以水平或垂直定向。                                                                                         |
| ->**Latitude Longitude (Cylindrical)**    | 将纹理映射到 2D 纬度/经度表示形式。                                                                                                                                                                  |
| ->**Mirrored Ball (Sphere Mapped)**       | 将纹理映射到类似球体的立方体贴图。                                                                                                                                                                   |
| **Convolution Type**                      | 选择要用于此纹理的预卷积（过滤）类型。预卷积的结果将存储在 Mip 中。<br/>此属性仅可用于 [Default][27] 纹理类型。                                                                                      |
| ->**None**                                | 纹理没有预卷积（无过滤）。此为默认值。                                                                                                                                                               |
| ->**Specular (Glossy Reflection)**        | 选择此选项可将立方体贴图用作反射探针。纹理 Mipmap 使用引擎 BRDF 进行预卷积（过滤）。有关更多信息，请参阅 Wikipedia 的[双向反射分布函数 (Bidirectional reflectance distribution function)][28] 页面。 |
| ->**Diffuse (Irradiance)**                | 对纹理进行卷积（过滤）以表示辐照度。如果将立方体贴图用作光照探针，则此选项非常有用。                                                                                                                 |
| **Fixup Edge Seams**                      | 仅在选择**None** 或 **Diffuse** 卷积（过滤）的情况下，此选项才可用。在低端平台上使用此选项作为解决过滤限制（例如在面之间错误过滤的立方体贴图）的解决方法。                                           |

### 2D 数组以及 3D 列和行

**2D 数组\_\_和** 3D\_\_ 纹理的源纹理文件会划分为单元格；这些纹理称为翻页纹理。当 Unity 导入翻页纹理时，它会将每个单元格的内容放入其自己的 2D 数组层或 3D 纹理切片中。

将 **Texture Shape** 属性设置为 **2D Array** 或 **3D** 时，Unity 会显示 **Columns** 和 **Rows** 属性。使用这些属性可告诉 Unity 如何将翻页纹理划分为单元格。


| **属性：**  | **功能：**               |
| ------------- | -------------------------- |
| **Columns** | 源翻页纹理划分为的列数。 |
| **行**      | 源翻页纹理划分为的行数。 |

例如，具有 8x8 单元格烟雾效果帧的图像如下所示（作为默认 2D 纹理）：

![作为 2D 形状的翻页图像](https://docs.unity3d.com/cn/current/uploads/Main/TextureImporter-Flipbook-2D.png)

作为 2D 形状的翻页图像

但是当正确导入具有 8 列和 8 行的 3D 纹理时，它会如下所示：

![作为 3D 形状的翻页图像](https://docs.unity3d.com/cn/current/uploads/Main/TextureImporter-Flipbook-3D.png)

作为 3D 形状的翻页图像

## 特定于类型的设置和高级设置

根据您选择的纹理类型，Texture Import Settings 窗口中可能会显示不同的选项。其中一些选项特定于纹理类型本身，例如选择 [Sprite (2D and UI)][29] 类型时，可使用 Sprite Mode 设置。

使用 **Advanced** 设置可以更好地调整 Unity 处理纹理的方式。根据选择的\_\_纹理类型 (Texture Type)\_\_，这些设置的顺序和可用性可能略有不同。


| **属性：**                     | **描述：**                                                                                                                                                                                                                                                                                                 | **受以下类型的支持：**                                                                                                                                           |
| -------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **sRGB (Color Texture)**       | 启用此属性可指定将纹理存储在伽马空间中。对于非 HDR 颜色纹理（例如反照率和镜面反射颜色），应始终选中此复选框。如果纹理存储了有特定含义的信息，并且您需要着色器中的确切值（例如，平滑度或金属度），请禁用此属性。默认情况下会启用此属性。                                                                    | [Default][30]、<br/>[Sprite (2D and UI)][31]                                                                                                                     |
| **Alpha Source**               | 指定如何生成纹理的 Alpha 通道。默认情况下，此设置为**None**。                                                                                                                                                                                                                                              | [Default][32]、<br/>[Editor GUI and Legacy GUI][33]、<br/>[Sprite (2D and UI)][34]、<br/>[Cursor][35]、<br/>[Cookie][36]、<br/>[Single Channel][37]              |
| ->**None**                     | 无论输入纹理是否有 Alpha 通道，导入的纹理都没有 Alpha 通道。                                                                                                                                                                                                                                               |                                                                                                                                                                  |
| ->**Input Texture Alpha**      | 如果提供了纹理，则使用输入纹理中的 Alpha。                                                                                                                                                                                                                                                                 |                                                                                                                                                                  |
| ->**From Gray Scale**          | 从输入纹理 RGB 值的平均值生成 Alpha。                                                                                                                                                                                                                                                                      |                                                                                                                                                                  |
| **Alpha is Transparency**      | 如果指定的 Alpha 通道为透明度 (Transparency)，则启用此属性可扩充颜色并避免边缘上的过滤瑕疵。                                                                                                                                                                                                               | [Default][38]、<br/>[Editor GUI and Legacy GUI][39]、<br/>[Sprite (2D and UI)][40]、<br/>[Cursor][41]、<br/>[Cookie][42]、<br/>[Single Channel][43]              |
| **Remove Matte (PSD)**         | 对使用透明度（将彩色像素与白色像素混合）的 Photoshop 文件启用特殊处理。<br/><br/>**注意：**这仅适用于 PSD 文件。                                                                                                                                                                                           | [Default][44]、<br/>[Editor GUI and Legacy GUI][45]、<br/>[Sprite (2D and UI)][46]、<br/>[Cursor][47]、<br/>[Cookie][48]、<br/>[Single Channel][49]              |
| **Ignore PNG file gamma**      | 启用此属性可忽略 PNG 文件中的伽马 (Gamma) 特性。此属性不影响其他文件格式。                                                                                                                                                                                                                                 | [All Texture Types][50]                                                                                                                                          |
| **Non Power of 2**             | 如果纹理具有“非 2 的幂”(NPOT) 尺寸大小，此属性将定义导入时的缩放行为。请参阅[导入纹理][51]相关文档以了解有关 NPOT 大小的更多信息。默认情况下，此设置为 **None**。                                                                                                                                        | [Default][52]、<br/>[Normal map][53]、<br/>[Editor GUI and Legacy GUI][54]、<br/>[Cursor][55]、<br/>[Cookie][56]、<br/>[Lightmap][57]、<br/>[Single Channel][58] |
| ->**None**                     | 纹理尺寸大小保持不变。                                                                                                                                                                                                                                                                                     |                                                                                                                                                                  |
| ->**To nearest**               | 在导入时将纹理缩放到最接近的“2 的幂”尺寸大小。例如，257x511 像素的纹理将缩放为 256x512 像素。请注意，PVRTC 格式要求纹理为正方形（即宽度等于高度），因此最终尺寸大小将升级为 512x512 像素。                                                                                                               |                                                                                                                                                                  |
| ->**To larger**                | 在导入时将纹理缩放到最大尺寸大小值的“2 的幂”尺寸大小。例如，257x511 像素的纹理将缩放为 512x512 像素。                                                                                                                                                                                                    |                                                                                                                                                                  |
| ->**To smaller**               | 在导入时将纹理缩放到最小尺寸大小值的“2 的幂”尺寸大小。例如，257x511 像素的纹理将缩放为 256x256 像素。                                                                                                                                                                                                    |                                                                                                                                                                  |
| **Read/Write Enabled**         | 启用此属性可以从脚本中使用[Texture2D.SetPixels][59]、[Texture2D.GetPixels][60] 和其他 [Texture2D][61] 方法访问纹理数据。在内部，Unity 使用纹理数据的副本进行脚本访问，这会使纹理所需的内存量增加一倍。因此，默认情况下会禁用此属性，仅在需要脚本访问权限时才应启用。有关更多信息，请参阅 [Texture2D][62]。 | [All Texture Types][63]                                                                                                                                          |
| **Virtual Texture Only**       | 启用此属性可将纹理仅与纹理堆栈结合使用以实现虚拟纹理。启用此属性后，不能保证纹理可以在播放器中作为 Texture2D 使用（即，不能从脚本中进行访问）。禁用此属性后，播放器会将纹理既作为 Texture2D（可从脚本中进行访问）又作为流式纹理包含在纹理堆栈中。                                                          | [Default][64]、<br/>[Normal map][65]                                                                                                                             |
| **Streaming Mip Maps**         | Enable this property to use[Mipmap Streaming][66] on this texture. This setting is valid for any Texture in the 3D environment that Unity displays with a Mesh Renderer. Diffuse Textures, normal maps and light maps are all valid for Texture Streaming.                                                 | [Default][67]、<br/>[Normal map][68]、<br/>[Lightmap][69]、<br/>[Single Channel][70]                                                                             |
| ->**Mip Map Priority**         | Use this to set the priority of the mipmap in the[Mipmap Streaming sytem][71].                                                                                                                                                                                                                             |                                                                                                                                                                  |
| **Generate Mip Maps**          | Enable this property to enable[mipmap][72] generation.<br/><br/>**Warning**: Every time you select a new Texture Type, this property reverts to the default for the new Texture Type, if defined. See [Texture types][73] to find this property’s default value for each type.                            | [All Texture Types][74]                                                                                                                                          |
| **Border Mip Maps**            | 启用此属性可避免颜色向外渗透到较低 MIP 级别的边缘。该功能用于光照剪影（见下文）。默认情况下会禁用此属性。<br/><br/>仅当启用了 **Generate Mip Maps** 时，此属性才可用。                                                                                                                                     |                                                                                                                                                                  |
| **Mip Map Filtering**          | 有两种 Mipmap 过滤方法可用于优化图像质量。默认选项为**Box**。<br/><br/>仅当启用了 **Generate Mip Maps** 时，此属性才可用。                                                                                                                                                                                 |                                                                                                                                                                  |
| ->**Box**                      | 这是淡出 Mipmap 的最简单方法。随着尺寸减小，MIP 级别将变得更加平滑。                                                                                                                                                                                                                                       |                                                                                                                                                                  |
| ->**Kaiser**                   | 这是一种随着 Mipmap 的尺寸大小下降而对其应用的锐化算法。如果纹理在远处太模糊，可尝试此选项。（这是一种 Kaiser 窗 (Kaiser Window) 算法；请参阅[Wikipedia][75] 以了解更多信息。）                                                                                                                            |                                                                                                                                                                  |
| **Mip Maps Preserve Coverage** | 如果希望生成的 Mipmap 的 Alpha 通道在 Alpha 测试期间保留覆盖率，请启用此属性。请参阅[TextureImporterSettings.mipMapsPreserveCoverage][76] 以了解更多信息。<br/><br/>仅当启用了 **Generate Mip Maps** 时，此属性才可用。                                                                                    |                                                                                                                                                                  |
| ->**Alpha Cutoff Value**       | 设置用于在 Alpha 测试期间控制 MipMap 覆盖范围的参考值。                                                                                                                                                                                                                                                    |                                                                                                                                                                  |
| **Fadeout Mip Maps**           | 启用此属性可在 MIP 级别递进时使 Mipmap 淡化为灰色。此属性用于细节贴图。最左边的滚动项是第一个开始淡出的 MIP 级别。最右侧的滚动项定义了纹理完全变灰的 MIP 级别。<br/><br/>仅当启用了 **Generate Mip Maps** 时，此属性才可用。                                                                               |                                                                                                                                                                  |
| **Wrap Mode**                  | 选择纹理平铺时的行为方式。默认选项为**Repeat**。                                                                                                                                                                                                                                                           | [All Texture Types][77]                                                                                                                                          |
| ->**Repeat**                   | 在区块中重复纹理。                                                                                                                                                                                                                                                                                         |                                                                                                                                                                  |
| ->**Clamp**                    | 拉伸纹理的边缘。                                                                                                                                                                                                                                                                                           |                                                                                                                                                                  |
| ->**Mirror**                   | 在每个整数边界上镜像纹理以创建重复图案。                                                                                                                                                                                                                                                                   |                                                                                                                                                                  |
| ->**Mirror Once**              | 镜像纹理一次，然后将其钳制到边缘像素。<br/><br/>**注意**：某些移动设备不支持 Mirror Once 模式。在这种情况下，Unity 将改用 **Mirror** 模式。                                                                                                                                                                |                                                                                                                                                                  |
| ->**Per-axis**                 | 选择此选项可单独控制 Unity 如何在 U 轴和 V 轴上包裹纹理。                                                                                                                                                                                                                                                  |                                                                                                                                                                  |
| **Filter Mode**                | 选择纹理在通过 3D 变换拉伸时如何进行过滤。默认选项为**Bilinear**。                                                                                                                                                                                                                                         | [All Texture Types][78]                                                                                                                                          |
| ->**Point (no filter)**        | 纹理在靠近时变为块状。                                                                                                                                                                                                                                                                                     |                                                                                                                                                                  |
| ->**Bilinear**                 | 纹理在靠近时变得模糊。                                                                                                                                                                                                                                                                                     |                                                                                                                                                                  |
| ->**Trilinear**                | 与 Bilinear 类似，但纹理也在不同的 MIP 级别之间模糊。                                                                                                                                                                                                                                                      |                                                                                                                                                                  |
| **Aniso Level**                | 以大角度查看纹理时提高纹理质量。各向异性过滤对于地板和地面纹理很有用，但伴随较高的性能成本。有关各向异性过滤的更多信息，请参阅[导入纹理][79]文档。                                                                                                                                                         | [All Texture Types][80]                                                                                                                                          |

## 特定于平台的覆盖 (Platform-specific overrides)

在为不同平台进行构建时，您需要考虑每个目标平台的分辨率、文件大小与相关内存大小要求、纹理质量以及要使用的压缩格式。**特定于平台的覆盖\_\_面板为** Default\_\_ 选项提供了一个选项卡，也为每个目标构建平台提供了一个选项卡。

![特定于平台的覆盖面板](https://docs.unity3d.com/cn/current/uploads/Main/PlatformSpecificOverrides.png)

特定于平台的覆盖面板

要设置覆盖值，请执行以下操作：

1.设置 **Default** 选项卡上的默认属性。 2.导航到特定的目标平台选项卡，并启用 **Override for &lt;target-platform&gt;** 选项。 3.设置覆盖属性。

下表描述了可用的属性：


| **属性：**                 | **功能：**                                                                                                                                                                                                                                                                            |
| ---------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Max Size**               | 设置导入的纹理的最大尺寸（以像素为单位）。美术师通常喜欢使用尺寸较大的纹理，但您可以将纹理缩小到合适的尺寸大小。                                                                                                                                                                      |
| **Resize Algorithm**       | 当纹理尺寸大于指定的**Max Size** 时，选择一种算法来缩小纹理尺寸。                                                                                                                                                                                                                     |
| ->**Mitchell**             | 使用 Mitchell 算法调整纹理的大小。这是默认的大小调整算法。                                                                                                                                                                                                                            |
| ->**Bilinear**             | 使用双线性插值来调整纹理的大小。如果小而锐利的细节在图像中很重要，此设置可以保留比 Mitchell 更多这些细节。                                                                                                                                                                            |
| **Format**                 | 绕过自动系统来指定用于纹理的内部表示。可用格式的列表取决于平台和纹理类型。有关更多信息，请参阅[特定于平台的覆盖的纹理格式][81]。<br/><br/>**注意：**即使不覆盖平台，此选项也会显示自动系统选择的格式。此属性仅在覆盖特定平台时可用，而不是作为默认设置。                              |
| **Compression**            | 选择纹理的压缩类型。这有助于 Unity 为纹理选择正确的压缩格式。根据平台和压缩格式的可用性，不同的设置可能最终会获得相同的内部格式。例如，\_\_Low Quality Compression\_\_ 会影响移动平台，但不会影响桌面平台。                                                                           |
| ->**None**                 | 不压缩纹理。                                                                                                                                                                                                                                                                          |
| ->**Low Quality**          | 以低质量格式压缩纹理。这种质量比**Normal Quality** 使用更少的内存。                                                                                                                                                                                                                   |
| ->**Normal Quality**       | 以标准格式压缩纹理。                                                                                                                                                                                                                                                                  |
| ->**High Quality**         | 以高质量格式压缩纹理。这种质量比**Normal Quality** 使用更多的内存。                                                                                                                                                                                                                   |
| **Use Crunch Compression** | 如果适用，使用 Crunch 压缩。Crunch 是一种基于 DXT 或 ETC 纹理压缩的有损压缩格式。Unity 在 CPU 上将纹理解压缩为 DXT 或 ETC，然后在运行时将其上传到 GPU。Crunch 压缩有助于纹理在磁盘上使用尽可能少的空间并方便下载。Crunch 纹理可能需要很长时间进行压缩，但在运行时的解压缩速度非常快。 |
| **Compressor Quality**     | 使用 Crunch 纹理压缩时，可使用滑动条调整质量。压缩质量越高意味着纹理越大，压缩时间越长。<br/><br/>**注意：**对于 Android 平台，Compressor Quality 值提供的选项略有不同。有关更多信息，请参阅[特定于平台的覆盖的纹理格式][82]。                                                        |
| **Split Alpha Channel**    | 允许在以下平台上对此纹理进行 Alpha 通道分离：\_\_tvOS**、**iOS**、**Lumin\_\_ 和 **Android**。有关更多信息，请参阅[关于 Android 的注意事项：纹理压缩格式][83]。                                                                                                                       |
| **Override ETC2 fallback** | 不支持 ETC2 的 Android 设备上的 ETC2 纹理解压缩回退重载。<br/><br/>允许选择在不支持 ETC2 纹理格式的 Android 设备上解压缩纹理使用的纹理格式。有关更多信息，请参阅[关于 Android 的注意事项：纹理压缩格式][84]。                                                                         |

<br/>

---

- 在 [2017.3][85] 版中更新了 Crunch 压缩格式 NewIn20173
- 在 [2020.1][86] 中添加了“Ignore PNG file gamma”NewIn20201

[1]: #特定于类型的设置和高级设置
[2]: #texture-type
[3]: #texture-shape
[4]: #特定于类型的设置和高级设置
[5]: TextureTypes.md
[6]: #特定于平台的覆盖-platform-specific-overrides
[7]: TextureTypes.md
[8]: TextureTypes.md#default
[9]: TextureTypes.md#法线贴图
[10]: ImportingTextures.md#法线贴图
[11]: TextureTypes.md#editor-gui-and-legacy-gui
[12]: Sprites.md
[13]: TextureTypes.md#sprite-2d-and-ui
[14]: TextureTypes.md#cursor
[15]: class-Light.md
[16]: Cookies.md
[17]: TextureTypes.md#cookie
[18]: class-LightmapParameters.md
[19]: TextureTypes.md#lightmap
[20]: TextureTypes.md#single-channel
[21]: class-Cubemap.md
[22]: TextureTypes.md#default
[23]: TextureTypes.md#法线贴图
[24]: TextureTypes.md#single-channel
[25]: class-Texture2DArray.md
[26]: class-Texture3D.md
[27]: TextureTypes.md#default
[28]: https://en.wikipedia.org/wiki/Bidirectional_reflectance_distribution_function
[29]: TextureTypes.md#sprite-2d-and-ui
[30]: TextureTypes.md#default
[31]: TextureTypes.md#sprite-2d-and-ui
[32]: TextureTypes.md#default
[33]: TextureTypes.md#editor-gui-and-legacy-gui
[34]: TextureTypes.md#sprite-2d-and-ui
[35]: TextureTypes.md#cursor
[36]: TextureTypes.md#cookie
[37]: TextureTypes.md#single-channel
[38]: TextureTypes.md#default
[39]: TextureTypes.md#editor-gui-and-legacy-gui
[40]: TextureTypes.md#sprite-2d-and-ui
[41]: TextureTypes.md#cursor
[42]: TextureTypes.md#cookie
[43]: TextureTypes.md#single-channel
[44]: TextureTypes.md#default
[45]: TextureTypes.md#editor-gui-and-legacy-gui
[46]: TextureTypes.md#sprite-2d-and-ui
[47]: TextureTypes.md#cursor
[48]: TextureTypes.md#cookie
[49]: TextureTypes.md#single-channel
[50]: TextureTypes.md
[51]: ImportingTextures.md
[52]: TextureTypes.md#default
[53]: TextureTypes.md#法线贴图
[54]: TextureTypes.md#editor-gui-and-legacy-gui
[55]: TextureTypes.md#cursor
[56]: TextureTypes.md#cookie
[57]: TextureTypes.md#lightmap
[58]: TextureTypes.md#single-channel
[59]: https://docs.unity3d.com/cn/current/ScriptReference/Texture2D.SetPixels.md
[60]: https://docs.unity3d.com/cn/current/ScriptReference/Texture2D.GetPixels.md
[61]: https://docs.unity3d.com/cn/current/ScriptReference/Texture2D.md
[62]: https://docs.unity3d.com/cn/current/ScriptReference/Texture2D-isReadable.md
[63]: TextureTypes.md
[64]: TextureTypes.md#default
[65]: TextureTypes.md#法线贴图
[66]: TextureStreaming.md
[67]: TextureTypes.md#default
[68]: TextureTypes.md#法线贴图
[69]: TextureTypes.md#lightmap
[70]: TextureTypes.md#single-channel
[71]: TextureStreaming.md
[72]: texture-mipmaps-introduction.md
[73]: TextureTypes.md
[74]: TextureTypes.md
[75]: https://en.wikipedia.org/wiki/Kaiser_window
[76]: https://docs.unity3d.com/cn/current/ScriptReference/TextureImporterSettings-mipMapsPreserveCoverage.md
[77]: TextureTypes.md
[78]: TextureTypes.md
[79]: ImportingTextures.md
[80]: TextureTypes.md
[81]: class-TextureImporterOverride.md
[82]: class-TextureImporterOverride.md
[83]: class-TextureImporterOverride.md#notes-on-android
[84]: class-TextureImporterOverride.md#notes-on-android
[85]: https://docs.unity3d.com/2017.3/Documentation/Manual/30_search.md?q=newin20173
[86]: https://docs.unity3d.com/2020.1/Documentation/Manual/30_search.md?q=newin20201
