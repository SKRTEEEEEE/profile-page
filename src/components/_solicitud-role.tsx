<FormField
control={form.control}
name="solicitud"
render={({field}) => (
  <FormItem>
  <FormLabel>Privilegio</FormLabel>
  <Select onValueChange={value => field.onChange(value === "NONE" ? null : value)} defaultValue={ field.value === null ? undefined : field.value }>               
     <FormControl>
      <SelectTrigger> 
        <SelectValue placeholder="Solicita una vez configurado el email" />
      </SelectTrigger>
    </FormControl>
    <SelectContent>
      {/* <SelectItem value="m@example.com">m@example.com</SelectItem> */}
      <SelectItem value="NONE">Sin privilegios</SelectItem>
      <SelectItem value="STUDENT">Alumno</SelectItem>
      <SelectItem value="ADMIN">Admin</SelectItem>
    </SelectContent>
  </Select>
  <FormDescription>
    Configura un email y solicita privilegios, nos pondremos en contacto inmediatamente.{" "}
    <Link href="#">Información aquí.</Link>.
  </FormDescription>
  <FormMessage />
</FormItem>
)}
/>