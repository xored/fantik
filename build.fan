using build
class Build : build::BuildPod
{
  new make()
  {
    podName = "fantik"
    version = Version("0.0.3")
    summary = "Fantom Web Widget Toolkit"
    
    srcDirs = [`fan/`, `fan/Utils/`, `fan/Utils/FunctionFlow/`, `fan/DynaTree/`, `fan/DynaTree/Events/`, `fan/Ajax/`, `fan/Ajax/Events/`, `fan/AceTextEditor/`, `fan/AceTextEditor/Types/`]
    
    depends = [
      // System      
      "sys 1.0", "concurrent 1.0", "gfx 1.0", "fwt 1.0", "web 1.0" 
    ]
    
    jsDirs = [ 
      `js/`, 
      `js/AceTextEditor/`,
      `js/AceTextEditor/Types/`,
      `js/Ajax/`,
      `js/DynaTree/`,
      `js/Utils/FunctionFlow/`
    ]
    
    resDirs = [
      `res/`, 
      `res/ace/`,
      `res/dynatree/`,
      `res/dynatree/skin/`,
      `res/dynatree/skin-vista/`,
      `res/dynatree/skin-fwt/`,
    ]
  }
}
