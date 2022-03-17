# [VisionUtility][1].GetColorBlindSafePalette

public static int GetColorBlindSafePalette (Color[] palette, float minimumLuminance, float maximumLuminance);

## 参数

palette

用于填充调色板的颜色的数组。

minimumLuminance

可允许的最小感知亮度为 0 到 1。对于深色背景，建议使用 0.2 或更大值。

maximumLuminance

可允许的最大感知亮度为 0 到 1。对于浅色背景，建议使用 0.8 或更小值。

## 返回

**int** 调色板中明确的颜色的数量。

## 描述

获取对于正常视力、绿色盲、红色盲和蓝色盲来讲均可辨识的颜色的调色板。

![](https://docs.unity3d.com/cn/current/StaticFiles/ScriptRefImages/ColorBlindSafePaletteTable.png) *绘制时使用的一组颜色及其感知亮度值。*

在将调色板传递给此方法之前先为其分配大小，以指定所需的颜色数量。返回值表示调色板中所含明确的颜色的数量。如果该值小于调色板的大小，则调色板按顺序重复颜色。

![](https://docs.unity3d.com/cn/current/StaticFiles/ScriptRefImages/ColorBlindSafePalette.png) “用于预览样本的窗口，这些样本在大多数视觉条件下都应该可辨识的。”

将以下脚本作为 ColorSwatchExample.cs 添加到 Assets/Editor，并导航至菜单选项 Window > Color Swatch Example。

 ```csharp
using [UnityEditor][2];
using UnityEngine;
using UnityEngine.Accessibility;  
  
public class ColorSwatchExample : [EditorWindow][3]
{
    // size of swatch background textures to generate
    private const int k_SwatchTextureSize = 16;
    // the maximum number of swatches for this example
    private const int k_MaxPaletteSize = 10;  
  
    [[MenuItem][4]("Window/[Color][5] Swatch Example")]
    private static void CreateWindow()
    {
        var window = GetWindow<ColorSwatchExample>();
        window.position = new [Rect][6](0f, 0f, 400f, 80f);
    }  
  
    // the background textures to use for the swatches
    private [Texture2D][7][] m_SwatchBackgrounds = new [Texture2D][8][k_MaxPaletteSize];  
  
    // the desired number of swatches
    [[SerializeField][9]]
    private int m_PaletteSize = 8;
    // the range of desired luminance values
    [[SerializeField][10]]
    private [Vector2][11] m_DesiredLuminance = new [Vector2][12](0.2f, 0.9f);
    // the colors obtained
    [[SerializeField][13]]
    private [Color][14][] m_Palette;
    // the number of unique colors in the palette before they repeat
    [[SerializeField][15]]
    private int m_NumUniqueColors;  
  
    // create swatch background textures when window first opens
    protected virtual void OnEnable()
    {
        titleContent = new [GUIContent][16]("[Color][17] Swatches");  
  
        // create background swatches with different patterns for repeated colors
        m_SwatchBackgrounds[0] = CreateSwatchBackground(k_SwatchTextureSize, 0, 0);
        m_SwatchBackgrounds[1] = CreateSwatchBackground(k_SwatchTextureSize, 1, 4);
        m_SwatchBackgrounds[2] = CreateSwatchBackground(k_SwatchTextureSize, 1, 3);
        m_SwatchBackgrounds[3] = CreateSwatchBackground(k_SwatchTextureSize, 6, 1);
        m_SwatchBackgrounds[4] = CreateSwatchBackground(k_SwatchTextureSize, 4, 3);
        m_SwatchBackgrounds[5] = CreateSwatchBackground(k_SwatchTextureSize, 6, 6);
        m_SwatchBackgrounds[6] = CreateSwatchBackground(k_SwatchTextureSize, 4, 2);
        m_SwatchBackgrounds[7] = CreateSwatchBackground(k_SwatchTextureSize, 6, 4);
        m_SwatchBackgrounds[8] = CreateSwatchBackground(k_SwatchTextureSize, 2, 5);
        m_SwatchBackgrounds[9] = CreateSwatchBackground(k_SwatchTextureSize, 1, 2);  
  
        UpdatePalette();
    }  
  
    // clean up textures when window is closed
    protected virtual void OnDisable()
    {
        for (int i = 0, count = m_SwatchBackgrounds.Length; i < count; ++i)
            DestroyImmediate(m_SwatchBackgrounds[i]);
    }  
  
    protected virtual void OnGUI()
    {
        // input desired number of colors and luminance values
        [EditorGUI.BeginChangeCheck][18]();  
  
        m_PaletteSize = [EditorGUILayout.IntSlider][19]("Palette Size", m_PaletteSize, 0, k_MaxPaletteSize);  
  
        float min = m_DesiredLuminance.x;
        float max = m_DesiredLuminance.y;
        [EditorGUILayout.MinMaxSlider][20]("Luminance [Range][21]", ref min, ref max, 0f, 1f);
        m_DesiredLuminance = new [Vector2][22](min, max);  
  
        if ([EditorGUI.EndChangeCheck][23]())
        {
            UpdatePalette();
        }  
  
        // display warning message if parameters are out of range
        if (m_NumUniqueColors == 0)
        {
            string warningMessage = "Unable to generate any unique colors with the specified luminance requirements.";
            [EditorGUILayout.HelpBox][24](warningMessage, [MessageType.Warning][25]);
        }
        // otherwise display swatches in a row
        else
        {
            using (new [GUILayout.HorizontalScope][26]())
            {
                [GUILayout.FlexibleSpace][27]();
                [Color][28] oldColor = [GUI.color][29];  
  
                int swatchBackgroundIndex = 0;
                for (int i = 0; i < m_PaletteSize; ++i)
                {
                    // change swatch background pattern when reaching a repeated color
                    if (i > 0 && i % m_NumUniqueColors == 0)
                        ++swatchBackgroundIndex;  
  
                    [Rect][30] rect = [GUILayoutUtility.GetRect][31](k_SwatchTextureSize \* 2, k_SwatchTextureSize \* 2);
                    rect.width = k_SwatchTextureSize \* 2;  
  
                    [GUI.color][32] = m_Palette[i];
                    [GUI.DrawTexture][33](rect, m_SwatchBackgrounds[swatchBackgroundIndex], [ScaleMode.ScaleToFit][34], true);
                }  
  
                [GUI.color][35] = oldColor;
                [GUILayout.FlexibleSpace][36]();
            }
        }
    }  
  
    // create a white texture with some pixels discarded to make a pattern
    private [Texture2D][37] CreateSwatchBackground(int size, int discardPixelCount, int discardPixelStep)
    {
        var swatchBackground = new [Texture2D][38](size, size);
        swatchBackground.hideFlags = [HideFlags.HideAndDontSave][39];
        swatchBackground.filterMode = [FilterMode.Point][40];  
  
        var pixels = swatchBackground.GetPixels32();
        int counter = 0;
        bool discard = false;
        for (int i = 0, count = pixels.Length; i < count; ++i)
        {
            pixels[i] = new [Color32][41](255, 255, 255, (byte)(discard ? 0 : 255));
            ++counter;
            if (discard && counter == discardPixelCount)
            {
                discard = false;
                counter = 0;
            }
            else if (!discard && counter == discardPixelStep)
            {
                discard = true;
                counter = 0;
            }
        }
        swatchBackground.SetPixels32(pixels);  
  
        swatchBackground.Apply();
        return swatchBackground;
    }  
  
    // request new palette
    private void UpdatePalette()
    {
        m_Palette = new [Color][42][m_PaletteSize];
        m_NumUniqueColors =
            [VisionUtility.GetColorBlindSafePalette][43](m_Palette, m_DesiredLuminance.x, m_DesiredLuminance.y);
    }
}
``` 

[1]: Accessibility.VisionUtility.md
[2]: UnityEditor.md
[3]: EditorWindow.md
[4]: MenuItem.md
[5]: Color.md
[6]: Rect.md
[7]: Texture2D.md
[8]: Texture2D.md
[9]: SerializeField.md
[10]: SerializeField.md
[11]: Vector2.md
[12]: Vector2.md
[13]: SerializeField.md
[14]: Color.md
[15]: SerializeField.md
[16]: GUIContent.md
[17]: Color.md
[18]: EditorGUI.BeginChangeCheck.md
[19]: EditorGUILayout.IntSlider.md
[20]: EditorGUILayout.MinMaxSlider.md
[21]: SocialPlatforms.Range.md
[22]: Vector2.md
[23]: EditorGUI.EndChangeCheck.md
[24]: EditorGUILayout.HelpBox.md
[25]: MessageType.Warning.md
[26]: GUILayout.HorizontalScope.md
[27]: GUILayout.FlexibleSpace.md
[28]: Color.md
[29]: GUI-color.md
[30]: Rect.md
[31]: GUILayoutUtility.GetRect.md
[32]: GUI-color.md
[33]: GUI.DrawTexture.md
[34]: ScaleMode.ScaleToFit.md
[35]: GUI-color.md
[36]: GUILayout.FlexibleSpace.md
[37]: Texture2D.md
[38]: Texture2D.md
[39]: HideFlags.HideAndDontSave.md
[40]: FilterMode.Point.md
[41]: Color32.md
[42]: Color.md
[43]: Accessibility.VisionUtility.GetColorBlindSafePalette.md
